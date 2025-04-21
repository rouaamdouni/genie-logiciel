import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Param,
  UseGuards,
} from "@nestjs/common"
import { ConfirmedGuard } from "src/common/confirmed.guard"
import { RoleGuard } from "src/common/role.guard"
import { Role, UseCases } from "src/utils/constants"

import { IMessageService } from "./i-message.services"

@Controller()
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.instructor, Role.student))
export class MessageController {
  constructor(
    @Inject(UseCases.message) private readonly messageService: IMessageService,
  ) {}

  @Get("rooms/:roomId/messages")
  async listRoomMessages(
    @Param("roomId") roomId: string,
    @Body("userId") userId: string,
  ) {
    const messages = await this.messageService.listRoomMessages({
      roomId,
      userId,
    })
    if (messages.isLeft()) {
      const { code, message, status } = messages.error
      throw new HttpException({ code, message }, status)
    }

    return { messages: messages.value }
  }
}
