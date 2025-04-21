import { Either } from "../../../utils/either"
import {
  CheckpointIsRated,
  CheckpointNotFound,
  CheckpointNotStarted,
  EntityNotInPath,
  NotAffected,
  PathNotEnrolled,
  PathNotFound,
  SuccessMessage,
  UserNotFound,
} from "../../../utils/types"

export interface IRateCheckpointUseCase {
  execute(args: RateCheckpointArgs): Promise<RateCheckpointResult>
}

export type RateCheckpointArgs = {
  checkpointId: string
  feedbackDocumentURL: string
  instructorId: string
  pathId: string
  rate: number
  studentId: string
}

export type RateCheckpointResult = Either<
  | CheckpointIsRated
  | CheckpointNotFound
  | CheckpointNotStarted
  | EntityNotInPath
  | NotAffected
  | PathNotEnrolled
  | PathNotFound
  | UserNotFound,
  SuccessMessage
>
