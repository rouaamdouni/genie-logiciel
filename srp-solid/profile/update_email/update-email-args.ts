import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class UpdateEmailArgs {
  @IsEmail()
  @IsNotEmpty({ message: "new email is required" })
  newEmail: string

  @IsNotEmpty({ message: "user password is required" })
  @IsString()
  userPassword: string
}
