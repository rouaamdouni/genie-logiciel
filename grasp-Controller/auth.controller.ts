 // controllers/auth.controller.ts
import { Inject } from "@nestjs/common"
import { Either, Left, Right } from "./imports/either"
import { BaseToken, IAccessService } from "./i-access.services"
import { Role, UseCases } from "./imports/constants"

type HandleAuthResult = Either<InvalidAuth, BaseToken>
type InvalidAuth = { payload: any }

export class AuthController {
  constructor(
    @Inject(UseCases.access) private readonly accessService: IAccessService,
  ) {}

  async handleAuth(authorization: string | undefined): Promise<HandleAuthResult> {
    if (!authorization)
      return Left.create({
        payload: { message: "authorization header must be provided" },
      })

    const tokenPayload = await this.accessService.verifyToken(authorization)
    if (tokenPayload.isLeft())
      return Left.create({ payload: { message: tokenPayload.error.message } })

    return Right.create(tokenPayload.value)
  }

  hasRole(role: Role): boolean {
    return [Role.instructor, Role.student].includes(role)
  }
}