import { IsOptional, IsString, IsUrl } from "class-validator"

export class UpdateProfileArgs {
  @IsOptional()
  @IsUrl()
  avatarURL?: string

  @IsOptional()
  @IsString()
  fullName?: string
}
