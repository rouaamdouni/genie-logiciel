import { SubQuizMetadata } from "./sub-quiz-metadata.domain"

export type GetQuizMetadataArgs = {
  questionId: string
  quizId: string
}

export interface ISubQuizMetadataRepo {
  get(args: GetQuizMetadataArgs): Promise<null | SubQuizMetadata>
  list(quizId: string): Promise<Array<SubQuizMetadata>>
  save(args: SubQuizMetadata): Promise<SubQuizMetadata>
}
