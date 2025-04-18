import { Either } from "../utils/either"
import { Position, SuccessMessage } from "../utils/types"

// i-create-quiz-use-case.ts
export type CreateQuizArgs = {
  defaultLanguage: string;
  label: string;
  metaTags: string[];
  position?: Position;
  slug: string;
};

export type CreateQuizResult = Either<never, SuccessMessage>

