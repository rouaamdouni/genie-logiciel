import { Graph, TEntity } from "./graph.domain"

export interface IGraphRepo {
  getByEntity(entity: string): Promise<Graph | null>
  getById(graphId: string): Promise<Graph | null>
  list(args?: ListGraphItemsArgs): Promise<Array<Graph>>
  save(args: Graph): Promise<void>
}

export type ListGraphItemsArgs = {
  entityType?: TEntity
  neighborsOf?: string
}
