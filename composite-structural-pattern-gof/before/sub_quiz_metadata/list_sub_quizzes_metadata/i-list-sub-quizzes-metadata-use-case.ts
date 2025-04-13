import { Either } from "../../../utils/either"
import { QuizNotFound } from "../../../utils/types"
import { SubQuizMetadataDTO } from "../config/sub-quiz-metadata.dto"

export interface IListSubQuizzesMetadataUseCase {
  execute(quizId: string): Promise<ListSubQuizzesMetadataResult>
}

export type ListSubQuizzesMetadataResult = Either<
  QuizNotFound,
  Array<SubQuizMetadataDTO>
>
