import { TEntity } from "../graph.domain"
import { PathItem } from "./path-item.domain"

export type GetPathItemArgs = {
  entityId: string
  pathId: string
}

export interface IPathItemRepo {
  get(args: GetPathItemArgs): Promise<null | PathItem>
  getById(pathItemId: string): Promise<null | PathItem>
  list(args: ListPathItemsArgs): Promise<Array<PathItem>>
  save(args: PathItem): Promise<void>
}

export type ListPathItemsArgs = {
  entityType?: TEntity
  pathId: string
}
