//for imports
import { HttpStatus } from "@nestjs/common"

// import { ChallengeDTO } from "../modules/challenge/config/challenge.dto"

export type AlreadyCohortInstructor = {
  code: "already_cohort_instructor"
  message: string
  status: HttpStatus.CONFLICT
}

export type AlreadyCohortMember = {
  code: "already_cohort_member"
  message: string
  status: HttpStatus.CONFLICT
}

export type ChallengeIsRated = {
  code: "challenge_rated"
  message: string
  status: HttpStatus.BAD_REQUEST
}

// export type ChallengeMetadata = Omit<ChallengeDTO, "contentFileURL">

export type ChallengeNotEnrolled = {
  code: "challenge_not_enrolled"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type ChallengeNotFound = {
  code: "challenge_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type CheckpointIsRated = {
  code: "checkpoint_rated"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type CheckpointNotFound = {
  code: "checkpoint_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type CheckpointNotStarted = {
  code: "checkpoint_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type CohortFinished = {
  code: "cohort_finished"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type CohortInstructorNotFound = {
  code: "cohort_instructor_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type CohortMemberNotFound = {
  code: "cohort_member_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}
export type CohortNotFound = {
  code: "cohort_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type CohortNotStarted = {
  code: "cohort_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type EdgeNotFound = {
  code: "edge_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}
export type EntityNotInPath = {
  code: "entity_not_in_path"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type ExpiredInvalidCode = {
  code: "invalid_expired_code"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type FollowUpSessionNotFound = {
  code: "follow-up_session_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type FollowUpSessionNotInCohort = {
  code: "follow-up_session_not_in_cohort"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type GraphNotFound = {
  code: "graph_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export interface Hint {
  details: Array<TextContent>
  requiredScore: number
}

export type InstructorAlreadyAffected = {
  code: "already_affected"
  message: string
  status: HttpStatus.CONFLICT
}

export type InternalError = {
  code: "internal_server_error"
  message: string
  status: HttpStatus.INTERNAL_SERVER_ERROR
}

export type InvalidCredentials = {
  code: "invalid_credentials"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type InvalidDate = {
  code: "invalid_date"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type InvalidFollowUpSessionStatusTransition = {
  code: "invalid_follow-up_session_status_transition"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type InvalidMaterial = {
  code: "invalid_material"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type InvalidOperation = {
  code: "invalid_operation"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type MemberNotFound = {
  code: "member_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type MissingTranslation = {
  code: "missing_translation"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type NodeNotCompleted = {
  code: "node_not_completed"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type NotAffected = {
  code: "not_affected"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type NotCohortInstructor = {
  code: "not_cohort_instructor"
  message: string
  status: HttpStatus.FORBIDDEN
}

export type PathAlreadyEnrolled = {
  code: "path_already_enrolled"
  message: string
  status: HttpStatus.CONFLICT
}

export type PathItemAlreadyCompleted = {
  code: "path_item_completed"
  message: string
  status: HttpStatus.CONFLICT
}

export type PathItemNotFound = {
  code: "path_item_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type PathNotEnrolled = {
  code: "path_not_enrolled"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type PathNotFound = {
  code: "path_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export interface Position {
  x: number
  y: number
}

export type PreviousItemNotCompleted = {
  code: "previous_item_not_completed"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type PrivateRoom = {
  code: "private_room"
  message: string
  status: HttpStatus.FORBIDDEN
}

export type QuizNotFound = {
  code: "quiz_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type QuizNotStarted = {
  code: "quiz_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type RewardIsRated = {
  code: "reward_rated"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type RewardNotFound = {
  code: "reward_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type RewardNotStarted = {
  code: "reward_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type RoomNotFound = {
  code: "room_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type ScoreInsufficient = {
  code: "score_insufficient"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type SkillNotFound = {
  code: "skill_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type SkillNotStarted = {
  code: "skill_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type StudentAlreadyEnrolled = {
  code: "already_enrolled"
  message: string
  status: HttpStatus.CONFLICT
}

export type StudentNotEnrolled = {
  code: "not_enrolled"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type SubQuizAnswered = {
  code: "sub_quiz_answered"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type SubQuizNotFound = {
  code: "sub_quiz_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type SubQuizNotStarted = {
  code: "sub_quiz_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type SuccessMessage = {
  isSuccess: true
  message: string
  payload: any
}

export type SuperSkillNotFound = {
  code: "super_skill_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

export type SuperSkillNotStarted = {
  code: "super_skill_not_started"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export interface TextContent {
  content: string
  language: string
}

export type UserAlreadyExist = {
  code: "taken_credentials"
  message: string
  status: HttpStatus.CONFLICT
}
export type UserNotFound = {
  code: "user_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}
