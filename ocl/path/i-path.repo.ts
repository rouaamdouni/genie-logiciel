import { Category } from "src/utils/constants"

import { Path } from "./path.domain"

export type GetPathByIdArgs = {
  language?: string
  pathId: string
}

export interface IPathRepo {
  getById(args: GetPathByIdArgs): Promise<null | Path>
  list(args?: ListPathsArgs): Promise<Array<Path>>
  save(args: Path): Promise<void>
}

export type ListPathsArgs = {
  category?: Category
  language?: string
}
