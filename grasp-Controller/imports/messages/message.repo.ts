import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { MessageDocument } from "../../../database/mongo/models/message"
import { IMessageRepo } from "./i-message.repo"
import { Message } from "./message.domain"
import { MessageDTO } from "./message.dto"

@Injectable()
export class MessageRepo implements IMessageRepo {
  constructor(
    @InjectModel(Models.messages)
    private readonly messageModel: Model<MessageDocument>,
    @Inject(Mappers.message)
    private messageMapper: IMapper<Message, MessageDTO>,
  ) {}

  async getById(messageId: string): Promise<Message | null> {
    const existingMessage = await this.messageModel.findOne({
      _id: new Types.ObjectId(messageId),
      deletedAt: { $exists: false },
    })

    return existingMessage ? this.messageMapper.toDomain(existingMessage) : null
  }

  async listByRoomId(roomId: string): Promise<Array<Message>> {
    const messages = await this.messageModel.find({
      deletedAt: { $exists: false },
      room: new Types.ObjectId(roomId),
    })

    return messages.map(this.messageMapper.toDomain)
  }

  async save(args: Message): Promise<void> {
    await this.messageModel.findOne(
      { _id: new Types.ObjectId(args.messageId) },
      this.messageMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
