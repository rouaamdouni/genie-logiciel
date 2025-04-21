import { Either } from "./either"
import { RoomDTO } from "./rooms.dto"
import { PrivateRoom, RoomNotFound } from "./types"

export interface IRoomReader {
    getRoom(args: GetRoomArgs): Promise<GetRoomResult>
    listPublicRooms(): Promise<ListRoomsResult>
  }
  
  export type GetRoomArgs = {
    roomId: string
    userId: string
  }
  
  export type GetRoomResult = Either<PrivateRoom | RoomNotFound, RoomDTO>
  export type ListRoomsResult = Either<never, Array<RoomDTO>>