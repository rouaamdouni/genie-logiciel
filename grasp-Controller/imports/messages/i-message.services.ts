import { Either } from "src/utils/either"
import { PrivateRoom, RoomNotFound } from "src/utils/types"

import { MessageDTO } from "./message.dto"

export interface IMessageService {
  listRoomMessages(args: ListRoomMessagesArgs): Promise<ListRoomMessagesResult>
}

export type ListRoomMessagesArgs = {
  roomId: string
  userId: string
}

export type ListRoomMessagesResult = Either<
  PrivateRoom | RoomNotFound,
  Array<MessageDTO>
>
