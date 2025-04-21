import { Either } from "./either"
import { RoomDTO } from "./rooms.dto"

export interface IRoomCreator {
    createRoom(args: CreateRoomArgs): Promise<CreateRoomResult>
  }
  
  export type CreateRoomArgs = {
    creatorId: string
    isPublic: boolean
    label: string
    roomAvatarURL: string
    slug: string
  }
  
  export type CreateRoomResult = Either<never, RoomDTO>