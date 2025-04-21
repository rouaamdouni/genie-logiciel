import { Message } from "./message.domain"

export interface IMessageRepo {
  getById(messageId: string): Promise<Message | null>
  listByRoomId(roomId: string): Promise<Array<Message>>
  save(args: Message): Promise<void>
}
