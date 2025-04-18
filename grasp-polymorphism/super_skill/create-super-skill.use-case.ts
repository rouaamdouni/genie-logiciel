// use-cases/create-super-skill.use-case.ts
import { Injectable } from "@nestjs/common"
import { BaseCreateEntityUseCase } from "../base-create-entity.use-case"
import { SuperSkill } from "../super-skill.domain"
import { CreateSuperSkillArgs, CreateSuperSkillResult } from "../i-create-super-skill-use-case"
import { TEntity } from "../utils/entity"
import { defaultSuperSkillDifficulty, defaultSuperSkillScore } from "../utils/constants"


@Injectable()
export class CreateSuperSkillUseCase extends BaseCreateEntityUseCase<
  SuperSkill,
  CreateSuperSkillArgs,
  CreateSuperSkillResult
> {
  protected getEntityType(): TEntity {
    return "superSkills"
  }

  protected getSuccessMessage(): string {
    return "Super skill created successfully"
  }

  protected buildEntity(
    args: CreateSuperSkillArgs,
    superSkillId: string,
  ): SuperSkill {
    return new SuperSkill(
      superSkillId,
      args.slug,
      [{ content: args.label, language: args.defaultLanguage }],
      [{ content: args.description, language: args.defaultLanguage }],
      [{ content: args.contentFileURL, language: args.defaultLanguage }],
      args.metaTags.map(tag => [{ content: tag, language: args.defaultLanguage }]),
      args.defaultLanguage,
      args.difficulty ?? defaultSuperSkillDifficulty,
      args.score ?? defaultSuperSkillScore,
    );
  }
}