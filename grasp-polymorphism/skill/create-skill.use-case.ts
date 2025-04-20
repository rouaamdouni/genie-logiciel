// use-cases/create-skill.use-case.ts
import { Injectable } from "@nestjs/common"
import { BaseCreateEntityUseCase } from "../base-create-entity.use-case"
import { Skill } from "../skill//skill.domain"
import { CreateSkillArgs, CreateSkillResult } from "../skill/i-create-skill-args"
import { TEntity } from "../utils/entity"
import { defaultSkillDifficulty, defaultSkillScore } from "../utils/constants"

@Injectable()
export class CreateSkillUseCase extends BaseCreateEntityUseCase<
  Skill,
  CreateSkillArgs,
  CreateSkillResult
> {
  protected getEntityType(): TEntity {
    return "skills"
  }

  protected getSuccessMessage(): string {
    return "Skill created successfully"
  }

  protected buildEntity(args: CreateSkillArgs, skillId: string): Skill {
    return new Skill(
      skillId,
      args.slug,
      [{ content: args.label, language: args.defaultLanguage }],
      [{ content: args.contentFileURL, language: args.defaultLanguage }],
      args.metaTags.map(tag => [{ content: tag, language: args.defaultLanguage }]),
      args.defaultLanguage,
      args.score ?? defaultSkillScore,
      args.difficulty ?? defaultSkillDifficulty,
    );
  }
}