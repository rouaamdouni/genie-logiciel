import { Either } from "../../utils/either"
import { SuccessMessage, UserNotFound } from "../../utils/types"

export interface IUpdateProfileUseCase {
  execute(args: UpdateProfileArgs): Promise<UpdateProfileResult>
}

export type UpdateProfileArgs = {
  avatarURL?: string
  fullName?: string
  userId: string
}

export type UpdateProfileResult = Either<UserNotFound, SuccessMessage>
