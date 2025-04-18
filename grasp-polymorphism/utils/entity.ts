import { Position } from "./types"

// shared/types.ts
export type TEntity = "skills" | "superSkills" | "checkpoints" | "quizzes" | "rewards"

export interface IEntityCreatedEvent {
  newCreatedEntity(params: {
    entityId: string
    entityType: TEntity
    position?: Position
  }): Promise<void>
}

export interface IRepo<T> {
  save(entity: T): Promise<void>
  getById?(params: { [key: string]: any }): Promise<T | null>
}