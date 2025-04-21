import { Room } from "./rooms.domain"

export interface IRoomRepo {
  getById(roomId: string): Promise<null | Room>
  listByCreatorId(creatorId: string): Promise<Array<Room>>
  listPublic(): Promise<Array<Room>>
  save(args: Room): Promise<void>
}
