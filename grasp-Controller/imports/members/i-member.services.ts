import { Either } from "src/utils/either"
import { MemberNotFound, PrivateRoom, RoomNotFound } from "src/utils/types"

import { MemberDTO } from "./member.dto"

export type GetMemberArgs = {
  roomId: string
  userId: string
}

export type GetMembershipResult = Either<
  MemberNotFound | RoomNotFound,
  MemberDTO
>
export interface IMemberService {
  getMembership(args: GetMemberArgs): Promise<GetMembershipResult>
  listMemberships(userId: string): Promise<ListMembershipsResult>
  listRoomMembers(args: ListRoomMembersArgs): Promise<ListRoomMembersResult>
}

export type ListMembershipsResult = Either<never, Array<MemberDTO>>

export type ListRoomMembersArgs = {
  roomId: string
  userId: string
}

export type ListRoomMembersResult = Either<
  PrivateRoom | RoomNotFound,
  Array<MemberDTO>
>
