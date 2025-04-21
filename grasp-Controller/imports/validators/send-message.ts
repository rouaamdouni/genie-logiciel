import { IsMongoId, IsNotEmpty } from "class-validator"

export class SendMessageArgs {
  @IsMongoId()
  @IsNotEmpty({ message: "message is required" })
  message: string

  @IsMongoId()
  @IsNotEmpty({ message: "room id is required" })
  roomId: string
}
