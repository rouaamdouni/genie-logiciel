import { HttpStatus, Inject, Injectable } from "@nestjs/common"
import { IMapper } from "src/common/mapper"
import { Mappers, Repos } from "src/utils/constants"
import { Left, Right } from "src/utils/either"

import { IRoomRepo } from "../rooms/i-rooms.repo"
import { IMemberRepo } from "./i-member.repo"
import {
  GetMemberArgs,
  GetMembershipResult,
  IMemberService,
  ListMembershipsResult,
  ListRoomMembersArgs,
  ListRoomMembersResult,
} from "./i-member.services"
import { Member } from "./member.domain"
import { MemberDTO } from "./member.dto"

@Injectable()
export class MemberService implements IMemberService {
  constructor(
    @Inject(Repos.member) private readonly memberRepo: IMemberRepo,
    @Inject(Repos.room) private readonly roomRepo: IRoomRepo,
    @Inject(Mappers.member)
    private readonly memberMapper: IMapper<Member, MemberDTO>,
  ) {}

  async getMembership(args: GetMemberArgs): Promise<GetMembershipResult> {
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

    if (!existingMembership)
      return Left.create({
        code: "member_not_found",
        message: "user is not a member in this room",
        status: HttpStatus.NOT_FOUND,
      })

    const mappedMembership = this.memberMapper.toDTO(existingMembership)
    return Right.create(mappedMembership)
  }

  async listMemberships(userId: string): Promise<ListMembershipsResult> {
    const memberships = await this.memberRepo.listByUserId(userId)
    const mappedMembers = memberships.map(this.memberMapper.toDTO)
    return Right.create(mappedMembers)
  }

  async listRoomMembers(
    args: ListRoomMembersArgs,
  ): Promise<ListRoomMembersResult> {
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

    const memberships = await this.memberRepo.listByRoomId(args.roomId)
    const mappedMembers = memberships.map(this.memberMapper.toDTO)
    return Right.create(mappedMembers)
  }
}
