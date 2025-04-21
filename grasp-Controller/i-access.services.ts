import { HttpStatus } from "@nestjs/common"
import { Role } from "src/utils/constants"
import { Either } from "src/utils/either"

import { AccessDTO } from "./access.dto"

export type BaseToken = { role: Role; userId: string }

export interface IAccessService {
  generateToken(payload: any): Promise<AccessDTO>
  verifyToken<U extends BaseToken>(
    authorizationHeader: string,
  ): Promise<VerifyTokenResult<U>>
}

export type InvalidExpiredToken = {
  code: "invalid_token"
  message: string
  status: HttpStatus.BAD_REQUEST
}

export type VerifyTokenResult<T> = Either<InvalidExpiredToken, T>
