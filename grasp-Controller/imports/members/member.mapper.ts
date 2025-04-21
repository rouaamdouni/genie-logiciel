import { Injectable } from "@nestjs/common"
import { Types } from "mongoose"
import { IMapper } from "src/common/mapper"

import { Member } from "./member.domain"
import { MemberDTO } from "./member.dto"

@Injectable()
export class MemberMapper implements IMapper<Member, MemberDTO> {
  toDomain(raw: any): Member {
    return new Member(
      raw.room.toString(),
      raw.user.toString(),
      new Date(raw.joined_at),
      raw.deletedAt && new Date(raw.deletedAt),
    )
  }

  toDTO(domain: Member): MemberDTO {
    return new MemberDTO(domain.room, domain.user, domain.joinedAt)
  }

  toPersistence(domain: Member) {
    return {
      deletedAt: domain.deletedAt,
      joinedAt: domain.joinedAt,
      room: new Types.ObjectId(domain.room),
      user: new Types.ObjectId(domain.user),
    }
  }
}
