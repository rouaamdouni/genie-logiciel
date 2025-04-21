import { CompletedReward } from "./completed-reward.domain"

export type GetCompletedRewardArgs = {
  pathId: string
  rewardId: string
  studentId: string
}

export interface ICompletedRewardRepo {
  get(args: GetCompletedRewardArgs): Promise<CompletedReward | null>
  list(args: ListCompletedRewardArgs): Promise<Array<CompletedReward>>
  save(args: CompletedReward): Promise<void>
}

export type ListCompletedRewardArgs = {
  pathId?: string
  rewardId?: string
  studentId?: string
}
