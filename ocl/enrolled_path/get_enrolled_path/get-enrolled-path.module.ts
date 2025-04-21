import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { UserModule } from "../../user/user.module"
import { EnrolledPathModule } from "../enrolled-path.module"
import { GetEnrolledPathController } from "./get-enrolled-path.controller"
import { GetEnrolledPathUseCase } from "./get-enrolled-path-use-case"

@Module({
  controllers: [GetEnrolledPathController],
  imports: [AccessModule, UserModule, EnrolledPathModule],
  providers: [
    {
      provide: UseCases.getEnrolledPath,
      useClass: GetEnrolledPathUseCase,
    },
  ],
})
export class GetEnrolledPathModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(GetEnrolledPathController)
  }
}
