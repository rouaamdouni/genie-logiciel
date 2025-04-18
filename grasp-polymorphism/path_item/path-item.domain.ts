import { TEntity } from "../graph/graph.domain";

export class PathItem {
  constructor(
    public readonly pathItemId: string,
    public readonly path: string,
    public readonly entity: string,
    public readonly entityType: TEntity,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
    public readonly prevItem?: string,
    public readonly nextItem?: string,
  ) {}
}
