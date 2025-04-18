import { Either } from "../../utils/either"
import { InvalidCredentials, SuccessMessage, UserNotFound } from "../../utils/types"

export interface IUpdatePasswordUseCase {
  execute(args: UpdatePasswordArgs): Promise<UpdatePasswordResult>
}

export type UpdatePasswordArgs = {
  newPassword: string
  userId: string
  userPassword: string
}

export type UpdatePasswordResult = Either<
  InvalidCredentials | UserNotFound,
  SuccessMessage
>
