import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { AccessModule } from "../../access/access.module"
import { UserModule } from "../../user/user.module"
import { EnrolledPathModule } from "../enrolled-path.module"
import { ListEnrolledPathsController } from "./list-enrolled-paths.controller"
import { ListEnrolledPathsUseCase } from "./list-enrolled-paths-use-case"

@Module({
  controllers: [ListEnrolledPathsController],
  imports: [AccessModule, UserModule, EnrolledPathModule],
  providers: [
    {
      provide: UseCases.listEnrolledPaths,
      useClass: ListEnrolledPathsUseCase,
    },
  ],
})
export class ListEnrolledPathsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(ListEnrolledPathsController)
  }
}
