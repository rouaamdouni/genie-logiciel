import { Injectable } from "@nestjs/common";
import { BaseCreateEntity } from "../base-create-entity.use-case";
import { Checkpoint } from "./checkpoint.domain";
import { CreateCheckpointArgs, CreateCheckpointResult } from "../checkpoint/i-create-checkpoint-use-case";
import { TEntity } from "../utils/entity";
import { EntityFactory } from "../entity-factory";

@Injectable()
export class CreateCheckpointUseCase extends BaseCreateEntity<
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

  protected buildEntity(args: CreateCheckpointArgs, id: string): Checkpoint {
    return EntityFactory.create(this.getEntityType(), id, args);
  }
}
