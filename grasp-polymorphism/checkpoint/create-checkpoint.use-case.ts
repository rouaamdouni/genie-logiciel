// create-checkpoint.use-case.ts
import { Injectable } from "@nestjs/common";
import { BaseCreateEntityUseCase } from "../base-create-entity.use-case";
import { Checkpoint } from "./checkpoint.domain";
import { CreateCheckpointArgs, CreateCheckpointResult } from "../i-create-checkpoint-use-case";
import { TEntity } from "../utils/entity";
import { defaultCheckpointDifficulty, defaultCheckpointScore } from "../utils/constants";

@Injectable()
export class CreateCheckpointUseCase extends BaseCreateEntityUseCase<
  Checkpoint,
  CreateCheckpointArgs,
  CreateCheckpointResult
> {
  protected getEntityType(): TEntity {
    return "checkpoints";
  }

  protected getSuccessMessage(): string {
    return "Checkpoint created successfully";
  }

  protected buildEntity(
    args: CreateCheckpointArgs, 
    checkpointId: string, 
  ): Checkpoint {
    return new Checkpoint(
      checkpointId,
      args.slug,
      [{ content: args.label, language: args.defaultLanguage }],
      [{ content: args.contentFileURL, language: args.defaultLanguage }], // Ajout contentFileURL
      args.metaTags.map(tag => [{ content: tag, language: args.defaultLanguage }]),
      args.defaultLanguage,
      args.score ?? defaultCheckpointScore,
      args.difficulty ?? defaultCheckpointDifficulty,
    );
  }
}