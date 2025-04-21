import { HttpStatus, Inject, Injectable } from "@nestjs/common"
import { IMapper } from "src/common/mapper"
import { Mappers, Repos } from "src/utils/constants"
import { Left, Right } from "src/utils/either"

import { IMemberRepo } from "../members/i-member.repo"
import { IRoomRepo } from "../rooms/i-rooms.repo"
import { IMessageRepo } from "./i-message.repo"
import {
  IMessageService,
  ListRoomMessagesArgs,
  ListRoomMessagesResult,
} from "./i-message.services"
import { Message } from "./message.domain"
import { MessageDTO } from "./message.dto"

@Injectable()
export class MessageService implements IMessageService {
  constructor(
    @Inject(Repos.message) private readonly messageRepo: IMessageRepo,
    @Inject(Repos.member) private readonly memberRepo: IMemberRepo,
    @Inject(Repos.room) private readonly roomRepo: IRoomRepo,
    @Inject(Mappers.message)
    private messageMapper: IMapper<Message, MessageDTO>,
  ) {}

  async listRoomMessages(
    args: ListRoomMessagesArgs,
  ): Promise<ListRoomMessagesResult> {
    const existingRoom = await this.roomRepo.getById(args.roomId)
    if (!existingRoom)
      return Left.create({
        code: "room_not_found",
        message: "room not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingMembership = await this.memberRepo.get({
      roomId: args.roomId,
      userId: args.userId,
    })

    if (!existingRoom.isPublic && !existingMembership)
      return Left.create({
        code: "private_room",
        message: "room is private",
        status: HttpStatus.FORBIDDEN,
      })

    const messages = await this.messageRepo.listByRoomId(args.roomId)
    const mappedMessages = messages.map(this.messageMapper.toDTO)
    return Right.create(mappedMessages)
  }
}
