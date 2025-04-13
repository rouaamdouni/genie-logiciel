import { Either } from "../../../utils/either"
import {
  EntityNotInPath,
  NotAffected,
  PathNotEnrolled,
  PathNotFound,
  RewardIsRated,
  RewardNotFound,
  RewardNotStarted,
  SuccessMessage,
  UserNotFound,
} from "../../../utils/types"

export type RateRewardArgs = {
  feedbackDocumentURL: string
  instructorId: string
  pathId: string
  rate: number
  rewardId: string
  studentId: string
}

export type RateRewardResult = Either<
  | EntityNotInPath
  | NotAffected
  | PathNotEnrolled
  | PathNotFound
  | RewardIsRated
  | RewardNotFound
  | RewardNotStarted
  | UserNotFound,
  SuccessMessage
>

export interface IRateRewardUseCase {
  execute(args: RateRewardArgs): Promise<RateRewardResult>
}
