// controllers/member.controller.ts
import { Inject } from "@nestjs/common"
import { Mappers, Repos, SocketEvents } from "./imports/constants"
import { IMemberRepo } from "./imports/members/i-member.repo"
import { Member } from "./imports/members/member.domain"
import { MemberDTO } from "./imports/members/member.dto"
import { AddMemberArgs } from "./imports/validators/add-member"
import { IRoomRepo } from "./i-rooms.repo"
import { IUserRepo } from "./i-user.repo"
import { IMapper } from "./mapper"
import { ICacheRepo } from "./i-cache.repo"
import { Server, Socket } from "socket.io"
import {
    WebSocketServer,
  } from "@nestjs/websockets"
export class MemberController {
    @WebSocketServer()
    server: Server 
  constructor(
    @Inject(Repos.member) private readonly memberRepo: IMemberRepo,
    @Inject(Repos.room) private readonly roomRepo: IRoomRepo,
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Repos.cache) private readonly connectedUserCache: ICacheRepo<string>,
    @Inject(Mappers.member) private readonly memberMapper: IMapper<Member, MemberDTO>,
  ) {}

  async handleConnection(client: Socket, userId: string) {
    const userToSocketsKey = `user_to_sockets_${userId}`
    await this.connectedUserCache.push(userToSocketsKey, client.id)

    const memberships = await this.memberRepo.listByUserId(userId)
    client.join(memberships.map((membership) => membership.room))
  }

  async addMember(client: Socket, data: AddMemberArgs, loggedUserId: string) {
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
}