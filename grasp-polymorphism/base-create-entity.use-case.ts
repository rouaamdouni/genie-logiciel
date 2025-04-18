// use-cases/base-create-entity.use-case.ts
import {  Injectable } from "@nestjs/common"
import { Events } from "./utils/constants"
import { IEntityCreatedEvent, IRepo, TEntity } from "./utils/entity"
import { generateId } from "./utils/generate-id"
import { Right } from "./utils/either"
import { Position } from "./utils/types"

@Injectable()
export abstract class BaseCreateEntityUseCase<
  Entity extends { [key: string]: any },
  Args extends {
    position?: Position
    defaultLanguage: string
    contentFileURL?: string
    label: string
    metaTags: string[]
    slug: string
  },
  Result
> {
  constructor(
    @Inject(Events.entityCreated)
    protected readonly entityCreatedEvent: IEntityCreatedEvent,
    protected readonly repo: IRepo<Entity>
  ) {}

  protected abstract buildEntity(
    args: Args,
    id: string,
    createdAt: Date
  ): Entity

  protected abstract getEntityType(): TEntity

  protected abstract getSuccessMessage(): string

  async execute(args: Args): Promise<Result> {
    const createdAt = new Date()
    const entityId = generateId()

    const newEntity = this.buildEntity(args, entityId, createdAt)
    await this.repo.save(newEntity)

    await this.entityCreatedEvent.newCreatedEntity({
      entityId,
      entityType: this.getEntityType(),
      position: args.position ? { 
        x: args.position.x, 
        y: args.position.y 
      } : undefined,
    })

    return Right.create({
      isSuccess: true,
      message: this.getSuccessMessage(),
      payload: { [this.getEntityIdField()]: entityId },
    }) as Result
  }

  private getEntityIdField(): string {
    return `${this.getEntityType().replace(/s$/, "")}Id`
  }
}