import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { RateCheckpointController } from "./rate-checkpoint.controller"
import { RateCheckpointUseCase } from "./rate-checkpoint-use-case"
import { Repos } from "../utils/constants"
import { RateCheckpointValidatorsProvider } from "./rate-checkpoint-validators.provider"
@Module({
  controllers: [RateCheckpointController],
  providers: [
    RateCheckpointValidatorsProvider,
    {
      provide: Repos.RateCheckpointValidators,
      useFactory: (provider: RateCheckpointValidatorsProvider) =>
        provider.getValidators(),
      inject: [RateCheckpointValidatorsProvider],
    },
    , {
      provide: UseCases.rateCheckpoint,
      useClass: RateCheckpointUseCase,
    },
  ],
})
export class RateCheckpointModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(RateCheckpointController)
  }
}
