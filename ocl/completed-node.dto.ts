import { TEntity } from "../../graph/config/graph.domain"

export class CompletedNodeDTO {
  constructor(
    public readonly pathId: string,
    public readonly studentId: string,
    public readonly entityType: TEntity,
    public readonly entityId: string,
    public readonly isCompleted: boolean,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
