// create-reward.use-case.ts
import { Injectable } from "@nestjs/common";
import { BaseCreateEntityUseCase } from "../base-create-entity.use-case";
import { Reward } from "../reward/reward.domain";
import { CreateRewardArgs, CreateRewardResult } from "../reward/i-create-reward-use-case";
import { TEntity } from "../utils/entity";
import { defaultRewardDifficulty, defaultRewardScore } from "../utils/constants";

@Injectable()
export class CreateRewardUseCase extends BaseCreateEntityUseCase<
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
    rewardId: string,
  ): Reward {
    return new Reward(
      rewardId,
      args.slug,
      [{ content: args.label, language: args.defaultLanguage }],
      [{ content: args.contentFileURL, language: args.defaultLanguage }],
      args.metaTags.map(tag => [{ content: tag, language: args.defaultLanguage }]),
      args.defaultLanguage,
      args.score ?? defaultRewardScore,
      args.difficulty ?? defaultRewardDifficulty,
    );
  }
}