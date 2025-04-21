import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { JwtMiddleware } from "src/common/jwt.middleware"
import { LoggedMiddleware } from "src/common/logged.middleware"
import { Mappers, Models, Repos, UseCases } from "src/utils/constants"

import { RoomSchema } from "../../../database/mongo/models/room"
import { AccessModule } from "../access/access.module"
import { MemberModule } from "../members/member.module"
import { UserModule } from "../user/user.module"
import { RoomController } from "./rooms.controller"
import { RoomMapper } from "./rooms.mapper"
import { RoomRepo } from "./rooms.repo"
import { RoomService } from "./rooms.services"

const roomModel = MongooseModule.forFeature([
  { name: Models.rooms, schema: RoomSchema },
])

@Module({
  controllers: [RoomController],
  exports: [{ provide: Repos.room, useClass: RoomRepo }],
  imports: [
    roomModel,
    AccessModule,
    UserModule,
    forwardRef(() => MemberModule),
  ],
  providers: [
    { provide: Mappers.room, useClass: RoomMapper },
    { provide: Repos.room, useClass: RoomRepo },
    { provide: UseCases.room, useClass: RoomService },
  ],
})
export class RoomsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(RoomController)
  }
}
