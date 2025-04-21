import { IsMongoId, IsNotEmpty } from "class-validator"

export class AddMemberArgs {
  @IsMongoId()
  @IsNotEmpty({ message: "user id is required" })
  roomId: string

  @IsMongoId()
  @IsNotEmpty({ message: "user id is required" })
  userId: string
}
