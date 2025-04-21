import { Member } from "./member.domain"

export type GetMemberArgs = {
  roomId: string
  userId: string
}

export interface IMemberRepo {
  get(args: GetMemberArgs): Promise<Member | null>
  listByRoomId(roomId: string): Promise<Array<Member>>
  listByUserId(userId: string): Promise<Array<Member>>
  save(args: Member): Promise<void>
}
