import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { Repos, UseCases } from "src/utils/constants"

import { CacheModule } from "../cache/cache.module"
import { AccessService } from "./access.services"
import { WhiteListRepo } from "./white-list.repo"

@Module({
  exports: [
    { provide: UseCases.access, useClass: AccessService },
    { provide: Repos.whiteList, useClass: WhiteListRepo },
  ],
  imports: [JwtModule.register({}), CacheModule],
  providers: [
    { provide: UseCases.access, useClass: AccessService },
    { provide: Repos.whiteList, useClass: WhiteListRepo },
  ],
})
export class AccessModule {}
