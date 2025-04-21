import { IRoomCreator } from './IRoomCreator';
import { IRoomUpdater } from './IRoomUpdater';
import { Inject } from "@nestjs/common"
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets"
import { Server, Socket } from "socket.io"
import { IMapper } from "src/common/mapper"
import {
  Mappers,
  Repos,
  Role,
  SocketEvents,
  UseCases,
} from "src/utils/constants"
import { Either, Left, Right } from "src/utils/either"
import { generateId } from "src/utils/generate-id"

import { BaseToken, IAccessService } from "../access/i-access.services"
import { ICacheRepo } from "../cache/i-cache.repo"
import { IMemberRepo } from "../members/i-member.repo"
import { Member } from "../members/member.domain"
import { MemberDTO } from "../members/member.dto"
import { IMessageRepo } from "../messages/i-message.repo"
import { Message } from "../messages/message.domain"
import { MessageDTO } from "../messages/message.dto"
import { IRoomRepo } from "../rooms/i-rooms.repo"
import { IRoomReader } from "../rooms/rooms.service.interfaces"
import { IUserRepo } from "../user/config/i-user.repo"
import { AddMemberArgs } from "./validators/add-member"
import { SendMessageArgs } from "./validators/send-message"

type HandleAuthResult = Either<InvalidAuth, BaseToken>
type InvalidAuth = { payload: any }

@WebSocketGateway({
  cors: {
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    origin: process.env.CLIENT_URL,
  },
  namespace: "rooms",
})
export class ChatGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server

  constructor(
    @Inject(UseCases.access) private readonly accessService: IAccessService,
    @Inject(Repos.member) private readonly memberRepo: IMemberRepo,
    @Inject(Repos.room) private readonly roomRepo: IRoomRepo,
    @Inject(UseCases.roomReader) private readonly roomReader: IRoomReader,
    @Inject(UseCases.roomUpdater) private readonly roomUpdater: IRoomUpdater,
    @Inject(UseCases.roomCreator) private readonly roomCreator: IRoomCreator,

    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Repos.cache)
    private readonly connectedUserCache: ICacheRepo<string>,
    @Inject(Repos.message) private readonly messageRepo: IMessageRepo,
    @Inject(Mappers.member)
    private readonly memberMapper: IMapper<Member, MemberDTO>,
    @Inject(Mappers.message)
    private messageMapper: IMapper<Message, MessageDTO>,
  ) {}

  @SubscribeMessage(SocketEvents.addMember)
  async addMember(
    @MessageBody() data: AddMemberArgs,
    @ConnectedSocket() client: Socket,
  ) {
    const authorization = client.handshake.headers.authorization
    const authPayload = await this.handleAuth(authorization)
    if (authPayload.isLeft())
      return client.emit(SocketEvents.error, authPayload.error.payload)

    const loggedUserId = authPayload.value.userId
    const existingRoom = await this.roomRepo.getById(data.roomId)
    if (!existingRoom)
      return client.emit(SocketEvents.error, {
        code: "room_not_found",
        message: "room not found",
      })

    if (existingRoom.creator !== loggedUserId)
      return client.emit(SocketEvents.error, {
        code: "not_room_creator",
        message: "not room creator",
      })

    const existingUser = await this.userRepo.getById(data.userId)
    if (!existingUser)
      return client.emit(SocketEvents.error, {
        code: "user_not_found",
        message: "target user not found",
      })

    const existingMember = await this.memberRepo.get({
      roomId: data.roomId,
      userId: data.userId,
    })

    if (existingMember)
      return client.emit(SocketEvents.error, {
        code: "user_already_member",
        message: "user is already a member",
      })

    const newMember = {
      ...data,
      isDeleted: false,
      joinedAt: new Date(),
      room: data.roomId,
      user: data.userId,
    }

    await this.memberRepo.save(newMember)

    const mappedMember = this.memberMapper.toDTO(newMember)

    const userToSocketsKey = `user_to_sockets_${newMember.user}`
    const targetUserConnectedSockets =
      await this.connectedUserCache.list(userToSocketsKey)

    const connectedSockets = await this.server.fetchSockets()
    for (const connectedSocket of connectedSockets) {
      if (targetUserConnectedSockets.includes(connectedSocket.id)) {
        connectedSocket.join(newMember.room)
        connectedSocket.emit(SocketEvents.joinedRoom, {
          membership: mappedMember,
        })
      }
    }

    this.server.to(newMember.room).emit(SocketEvents.userJoinedRoom, {
      message: `${existingUser.fullName} has joined the room`,
      ...newMember,
    })
  }

  async handleConnection(client: Socket) {
    const authorization = client.handshake.headers.authorization
    const authPayload = await this.handleAuth(authorization)
    if (authPayload.isLeft()) {
      client.emit(SocketEvents.error, authPayload.error.payload)
      return client.disconnect()
    }

    if (!this.hasRole(authPayload.value.role)) {
      client.emit(SocketEvents.error, { message: "invalid user role" })
      return client.disconnect()
    }

    const userId = authPayload.value.userId

    const userToSocketsKey = `user_to_sockets_${userId}`
    await this.connectedUserCache.push(userToSocketsKey, client.id)

    const memberships = await this.memberRepo.listByUserId(userId)
    client.join(memberships.map((membership) => membership.room))
  }

  @SubscribeMessage(SocketEvents.sendMessage)
  async sendMessage(
    @MessageBody()
  )