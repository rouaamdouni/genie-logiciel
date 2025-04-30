import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"

import { JwtMiddleware } from "../../../common/jwt.middleware"
import { LoggedMiddleware } from "../../../common/logged.middleware"
import { UseCases } from "../../../utils/constants"
import { RateRewardController } from "./rate-reward.controller"
import { RateRewardUseCase } from "./rate-reward-use-case"
import { Repos } from "../utils/constants"
import { RateRewardValidatorsProvider } from "./rate-reward-validators.provider"
@Module({
  controllers: [RateRewardController],
  providers: [
    RateRewardValidatorsProvider,
    {
      provide: Repos.RateRewardValidators,
      useFactory: (provider: RateRewardValidatorsProvider) =>
        provider.getValidators(),
      inject: [RateRewardValidatorsProvider],
    },
    , {
      provide: UseCases.rateReward,
      useClass: RateRewardUseCase,
    },
  ],
})
export class RateRewardModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware, LoggedMiddleware)
      .forRoutes(RateRewardController)
  }
}
