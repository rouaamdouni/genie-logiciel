import { Either } from "../utils/either"
import { Position, SuccessMessage } from "../utils/types"

export type CreateSuperSkillArgs = {
  contentFileURL: string
  defaultLanguage: string
  description: string
  difficulty?: number
  label: string
  metaTags: Array<string>
  position: Position
  score?: number
  slug: string
}

export type CreateSuperSkillResult = Either<never, SuccessMessage>


