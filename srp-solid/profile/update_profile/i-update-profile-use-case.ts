import { Either } from "../../../polymorphism-grasp/utils/either"
import { SuccessMessage, UserNotFound } from "../../../polymorphism-grasp/utils/types"

export interface IUpdateProfileUseCase {
  execute(args: UpdateProfileArgs): Promise<UpdateProfileResult>
}

export type UpdateProfileArgs = {
  avatarURL?: string
  fullName?: string
  userId: string
}

export type UpdateProfileResult = Either<UserNotFound, SuccessMessage>
