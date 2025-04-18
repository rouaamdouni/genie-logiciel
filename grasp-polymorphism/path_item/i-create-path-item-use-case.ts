import { HttpStatus } from "@nestjs/common"
import { PathNotFound, SuccessMessage } from "../utils/types"
import { Either } from "../utils/either"


export type CreatePathItemArgs = {
  entityId: string
  pathId: string
}

export type CreatePathItemResult = Either<
  EntityNotFound | PathItemExists | PathNotFound,
  SuccessMessage
>

export interface ICreatePathItemUseCase {
  execute(args: CreatePathItemArgs): Promise<CreatePathItemResult>
}

type EntityNotFound = {
  code: "entity_not_found"
  message: string
  status: HttpStatus.NOT_FOUND
}

type PathItemExists = {
  code: "path_item_exists"
  message: string
  status: HttpStatus.CONFLICT
}
