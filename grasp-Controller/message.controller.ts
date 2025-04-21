// controllers/message.controller.ts
import { Inject } from "@nestjs/common"
import { SendMessageArgs } from "./imports/validators/send-message"
import { IRoomRepo } from "./i-rooms.repo"
import { IMemberRepo } from "./imports/members/i-member.repo"
import { Mappers, Repos, SocketEvents } from "./imports/constants"
import { Message } from "postcss"
import { IMessageRepo } from "./imports/messages/i-message.repo"
import { IUserRepo } from "./i-user.repo"
import { IMapper } from "./mapper"
import { Server, Socket } from "socket.io"
import {
    WebSocketServer,
  } from "@nestjs/websockets"
import { generateId } from "./imports/generate-id"
import { MessageDTO } from "./imports/messages/message.dto"

export class MessageController {
    @WebSocketServer()
    server: Server 
  constructor(
    @Inject(Repos.message) private readonly messageRepo: IMessageRepo,
    @Inject(Repos.room) private readonly roomRepo: IRoomRepo,
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Repos.member) private readonly memberRepo: IMemberRepo,
    @Inject(Mappers.message) private readonly messageMapper: IMapper<Message, MessageDTO>,
  ) {}

  async sendMessage(client: Socket, data: SendMessageArgs, loggedUserId: string) {
    const existingRoom = await this.roomRepo.getById(data.roomId)
    if (!existingRoom)
      return client.emit(SocketEvents.error, {
        code: "room_not_found",
        message: "room not found",
      })

    const existingUser = await this.userRepo.getById(loggedUserId)
    if (!existingUser)
      return client.emit(SocketEvents.error, {
        code: "user_not_found",
        message: "target user not found",
      })

    const existingMember = await this.memberRepo.get({
      roomId: data.roomId,
      userId: loggedUserId,
    })

    if (!existingMember)
      return client.emit(SocketEvents.error, {
        code: "user_not_a_member",
        message: "user not a member",
      })

    const newMessage = {
      deletedAt: undefined,
      message: data.message,
      messageId: generateId(),
      room: data.roomId,
      sender: loggedUserId,
      sentAt: new Date(),
    } satisfies Message

    await this.messageRepo.save(newMessage)

    const mappedMessage = this.messageMapper.toDTO(newMessage)
    return this.server
      .to(data.roomId)
      .emit(SocketEvents.userMessagedRoom, { message: mappedMessage })
  }
}