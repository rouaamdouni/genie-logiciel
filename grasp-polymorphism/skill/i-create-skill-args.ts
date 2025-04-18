import { Either } from "../utils/either"
import { Position, SuccessMessage } from "../utils/types"

export type CreateSkillArgs = {
  contentFileURL: string
  defaultLanguage: string
  difficulty?: number
  label: string
  metaTags: Array<string>
  position: Position
  score?: number
  slug: string
}

export type CreateSkillResult = Either<never, SuccessMessage>
