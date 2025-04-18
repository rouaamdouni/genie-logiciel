import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator"

export class UpdatePasswordArgs {
  @IsNotEmpty({ message: "new password is required" })
  @IsStrongPassword()
  newPassword: string

  @IsNotEmpty({ message: "user password is required" })
  @IsString()
  userPassword: string
}
