import { Either } from "../../../utils/either"
import { Position, SuccessMessage } from "../../../utils/types"

export type CreateQuizArgs = {
  defaultLanguage: string
  label: string
  metaTags: Array<string>
  position: Position
  slug: string
}

export type CreateQuizResult = Either<never, SuccessMessage>

export interface ICreateQuizUseCase {
  execute(args: CreateQuizArgs): Promise<CreateQuizResult>
}
