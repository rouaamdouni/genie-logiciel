import { Either } from "./either"
import { RoomDTO } from "./rooms.dto"
import { RoomNotFound } from "./types"

export interface IRoomUpdater {
    updateRoom(args: UpdateRoomArgs): Promise<UpdateRoomResult>
  }
  
  export type NotRoomCreator = {
    code: "not_room_creator"
    message: string
    status: HttpStatus.FORBIDDEN
  }
  
  export type UpdateRoomArgs = {
    creatorId: string
    isPublic?: boolean
    label?: string
    roomAvatarURL?: string
    roomId: string
  }
  
  export type UpdateRoomResult = Either<NotRoomCreator | RoomNotFound, RoomDTO>