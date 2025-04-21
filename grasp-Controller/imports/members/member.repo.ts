import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { MemberDocument } from "../../../database/mongo/models/member"
import { GetMemberArgs, IMemberRepo } from "./i-member.repo"
import { Member } from "./member.domain"
import { MemberDTO } from "./member.dto"

@Injectable()
export class MemberRepo implements IMemberRepo {
  constructor(
    @InjectModel(Models.members)
    private readonly memberModel: Model<MemberDocument>,
    @Inject(Mappers.member)
    private readonly memberMapper: IMapper<Member, MemberDTO>,
  ) {}

  async get(args: GetMemberArgs): Promise<Member | null> {
    const existingMember = await this.memberModel.findOne({
      deletedAt: { $exists: false },
      room: new Types.ObjectId(args.roomId),
      user: new Types.ObjectId(args.userId),
    })

    return existingMember ? this.memberMapper.toDomain(existingMember) : null
  }

  async listByRoomId(roomId: string): Promise<Array<Member>> {
    const members = await this.memberModel.find({
      deletedAt: { $exists: false },
      room: new Types.ObjectId(roomId),
    })

    return members.map(this.memberMapper.toDomain)
  }

  async listByUserId(userId: string): Promise<Array<Member>> {
    const members = await this.memberModel.find({
      deletedAt: { $exists: false },
      user: new Types.ObjectId(userId),
    })

    return members.map(this.memberMapper.toDomain)
  }

  async save(args: Member): Promise<void> {
    await this.memberModel.findOneAndUpdate(
      {
        room: new Types.ObjectId(args.room),
        user: new Types.ObjectId(args.user),
      },
      this.memberMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
