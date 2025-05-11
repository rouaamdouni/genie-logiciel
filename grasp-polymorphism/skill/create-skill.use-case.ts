// use-cases/create-skill.use-case.ts
import { Injectable } from "@nestjs/common"
import { BaseCreateEntity } from "../base-create-entity.use-case"
import { Skill } from "../skill//skill.domain"
import { CreateSkillArgs, CreateSkillResult } from "../skill/i-create-skill-args"
import { TEntity } from "../utils/entity"
import { EntityFactory } from "../entity-factory"

@Injectable()
export class CreateSkillUseCase extends BaseCreateEntity<
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

  protected buildEntity(args: CreateSkillArgs, id: string): Skill {
        return EntityFactory.create(this.getEntityType(), id, args);
    
  }
}