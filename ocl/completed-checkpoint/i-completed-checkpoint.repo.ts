import { CompletedCheckpoint } from "./completed-checkpoint.domain"

export type GetCompletedCheckpointArgs = {
  checkpointId: string
  pathId: string
  studentId: string
}

export interface ICompletedCheckpointRepo {
  get(args: GetCompletedCheckpointArgs): Promise<CompletedCheckpoint | null>
  list(args: ListCompletedCheckpointArgs): Promise<Array<CompletedCheckpoint>>
  save(args: CompletedCheckpoint): Promise<void>
}

export type ListCompletedCheckpointArgs = {
  checkpointId?: string
  pathId?: string
  studentId?: string
}
