import { Module } from "@nestjs/common"
import { Repos } from "src/utils/constants"

import { redisModule } from "../redis/module.config"
import { CacheRepo } from "./cache.repo"

@Module({
  exports: [{ provide: Repos.cache, useClass: CacheRepo }],
  imports: [redisModule],
  providers: [{ provide: Repos.cache, useClass: CacheRepo }],
})
export class CacheModule {}
