 // chats.module.ts (inchangé)
import { Module } from "@nestjs/common"
import { AccessModule } from "./imports/access.module";
import { UserModule } from "./imports/user.module";
import { MemberModule } from "./imports/member.module";
import { RoomsModule } from "./imports/rooms.module";
import { CacheModule } from "./imports/cache.module";
import { MessageModule } from "./imports/message.module";
import { ChatGateway } from "./chats.gateway";
import { MemberController } from "./member.controller";
import { MessageController } from "./message.controller";

@Module({
  imports: [
    AccessModule,
    UserModule,
    MemberModule,
    RoomsModule,
    CacheModule,
    MessageModule,
  ],
  providers: [ChatGateway, MemberController, MessageController],
})
export class ChatsModule {}