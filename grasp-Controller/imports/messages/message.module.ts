import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { JwtMiddleware } from "src/common/jwt.middleware"
import { LoggedMiddleware } from "src/common/logged.middleware"
import { Mappers, Models, Repos, UseCases } from "src/utils/constants"

import { MessageSchema } from "../../../database/mongo/models/message"
import { AccessModule } from "../access/access.module"
import { MemberModule } from "../members/member.module"
import { RoomsModule } from "../rooms/rooms.module"
import { UserModule } from "../user/user.module"
import { MessageController } from "./message.controller"
import { MessageMapper } from "./message.mapper"
import { MessageRepo } from "./message.repo"
import { MessageService } from "./message.services"

const messageModel = MongooseModule.forFeature([
  { name: Models.messages, schema: MessageSchema },
])

@Module({
  controllers: [MessageController],
  exports: [
    { provide: Mappers.message, useClass: MessageMapper },
    { provide: Repos.message, useClass: MessageRepo },
  ],
  imports: [messageModel, AccessModule, UserModule, MemberModule, RoomsModule],
  providers: [
    { provide: Mappers.message, useClass: MessageMapper },
    { provide: Repos.message, useClass: MessageRepo },
    { provide: UseCases.message, useClass: MessageService },
  ],
})
export class MessageModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware, LoggedMiddleware).forRoutes(MessageController)
  }
}
