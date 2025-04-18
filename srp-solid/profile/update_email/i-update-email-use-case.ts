import { Either } from "../../utils/either"
import { InvalidCredentials, SuccessMessage, UserAlreadyExist, UserNotFound } from "../../utils/types"


export interface IUpdateEmailUseCase {
  execute(args: UpdateEmailArgs): Promise<UpdateEmailResult>
}

export type UpdateEmailArgs = {
  newEmail: string
  userId: string
  userPassword: string
}

export type UpdateEmailResult = Either<
  InvalidCredentials | UserAlreadyExist | UserNotFound,
  SuccessMessage
>
