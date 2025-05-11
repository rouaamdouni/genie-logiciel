// create-reward.use-case.ts
import { Injectable } from "@nestjs/common";
import { BaseCreateEntity } from "../base-create-entity.use-case";
import { Reward } from "../reward/reward.domain";
import { CreateRewardArgs, CreateRewardResult } from "../reward/i-create-reward-use-case";
import { TEntity } from "../utils/entity";
import { EntityFactory } from "../entity-factory";

@Injectable()
export class CreateRewardUseCase extends BaseCreateEntity<
  Reward,
  CreateRewardArgs,
  CreateRewardResult
> {
  protected getEntityType(): TEntity {
    return "rewards";
  }

  protected getSuccessMessage(): string {
    return "Reward created successfully";
  }

  protected buildEntity(
    args: CreateRewardArgs, 
    id: string,
  ): Reward {
        return EntityFactory.create(this.getEntityType(), id, args);
    
  }
}