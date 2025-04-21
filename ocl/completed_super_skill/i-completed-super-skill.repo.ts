import { CompletedSuperSkill } from "./completed-super-skill.domain"

export type GetCompletedSuperSkillArgs = {
  pathId: string
  studentId: string
  superSkillId: string
}

export interface ICompletedSuperSkillRepo {
  get(args: GetCompletedSuperSkillArgs): Promise<CompletedSuperSkill | null>
  save(args: CompletedSuperSkill): Promise<void>
}
