// use-cases/create-super-skill.use-case.ts
import { Injectable } from "@nestjs/common"
import { BaseCreateEntity } from "../base-create-entity.use-case"
import { SuperSkill } from "../super_skill/super-skill.domain"
import { CreateSuperSkillArgs, CreateSuperSkillResult } from "../super_skill/i-create-super-skill-use-case"
import { TEntity } from "../utils/entity"
import { EntityFactory } from "../entity-factory"


@Injectable()
export class CreateSuperSkillUseCase extends BaseCreateEntity<
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
    id: string,
  ): SuperSkill {
       return EntityFactory.create(this.getEntityType(), id, args);
  }
}