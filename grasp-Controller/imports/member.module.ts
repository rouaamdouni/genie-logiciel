import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { JwtMiddleware } from "src/common/jwt.middleware"
import { LoggedMiddleware } from "src/common/logged.middleware"
import { Mappers, Models, Repos, UseCases } from "src/utils/constants"

import { MemberSchema } from "../../../database/mongo/models/member"
import { AccessModule } from "../access/access.module"
import { RoomsModule } from "../rooms/rooms.module"
import { UserModule } from "../user/user.module"
import { MemberController } from "./member.controller"
import { MemberMapper } from "./member.mapper"
import { MemberRepo } from "./member.repo"
import { MemberService } from "./member.services"

const memberModel = MongooseModule.forFeature([
  { name: Models.members, schema: MemberSchema },
])

@Module({
  controllers: [MemberController],
  exports: [
    { provide: Repos.member, useClass: MemberRepo },
    { provide: Mappers.member, useClass: MemberMapper },
  ],
  imports: [memberModel, UserModule, AccessModule, RoomsModule],
  providers: [
    { provide: Mappers.member, useClass: MemberMapper },
    { provide: Repos.member, useClass: MemberRepo },
    { provide: UseCases.member, useClass: MemberService },
  ],
})
export class MemberModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(MemberController)
  }
}
