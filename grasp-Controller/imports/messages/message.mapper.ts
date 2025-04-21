import { Injectable } from "@nestjs/common"
import { Types } from "mongoose"
import { IMapper } from "src/common/mapper"

import { Message } from "./message.domain"
import { MessageDTO } from "./message.dto"

@Injectable()
export class MessageMapper implements IMapper<Message, MessageDTO> {
  toDomain(raw: any): Message {
    return new Message(
      raw._id.toString(),
      raw.sender.toString(),
      raw.room.toString(),
      raw.message,
      new Date(raw.sent_at),
      raw.deletedAt && new Date(raw.deletedAt),
    )
  }

  toDTO(domain: Message): MessageDTO {
    return new MessageDTO(
      domain.messageId,
      domain.sender,
      domain.room,
      domain.message,
      domain.sentAt,
      domain.deletedAt,
    )
  }

  toPersistence(domain: Message) {
    return {
      _id: new Types.ObjectId(domain.messageId),
      deletedAt: domain.deletedAt,
      message: domain.message,
      room: new Types.ObjectId(domain.room),
      sender: new Types.ObjectId(domain.sender),
      sentAt: domain.sentAt,
    }
  }
}
