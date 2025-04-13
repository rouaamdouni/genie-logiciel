import { Either } from "../../../utils/either"
import {
  ChallengeIsRated,
  ChallengeNotEnrolled,
  ChallengeNotFound,
  SuccessMessage,
  UserNotFound,
} from "../../../utils/types"

export type RateChallengeArgs = {
  challengeId: string
  feedbackDocumentURL: string
  rate: number
  studentId: string
}

export type RateChallengeResult = Either<
  ChallengeIsRated | ChallengeNotEnrolled | ChallengeNotFound | UserNotFound,
  SuccessMessage
>

export interface IRateChallengeUseCase {
  execute(args: RateChallengeArgs): Promise<RateChallengeResult>
}
