import { CompletedSkill } from "./completed-skill.domain"

export type GetCompletedSkillArgs = {
  pathId: string
  skillId: string
  studentId: string
}

export interface ICompletedSkillRepo {
  get(args: GetCompletedSkillArgs): Promise<CompletedSkill | null>
  save(args: CompletedSkill): Promise<void>
}
