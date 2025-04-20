import { Position } from "../utils/types";

export enum TEntity {
  checkpoints = "checkpoints",
  quizzes = "quizzes",
  rewards = "rewards",
  skills = "skills",
  superSkills = "superSkills",
}

export class Graph {
  constructor(
    public readonly graphId: string,
    public readonly position: Position,
    public readonly entity: string,
    public readonly entityType: TEntity,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
