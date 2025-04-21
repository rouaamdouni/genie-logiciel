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
import { Role, Routes, UseCases } from "src/utils/constants"

import { IMemberService } from "./i-member.services"

@Controller()
@UseGuards(new ConfirmedGuard())
@UseGuards(RoleGuard(Role.instructor, Role.student))
export class MemberController {
  constructor(
    @Inject(UseCases.member) private readonly memberService: IMemberService,
  ) {}

  @Get("rooms/:roomId/membership")
  async getMembership(
    @Param("roomId") roomId: string,
    @Body("userId") userId: string,
  ) {
    const membership = await this.memberService.getMembership({
      roomId,
      userId,
    })
    if (membership.isLeft()) {
      const { code, message, status } = membership.error
      throw new HttpException({ code, message }, status)
    }

    return { membership: membership.value }
  }

  @Get(Routes.memberships)
  async listMemberships(@Body("userId") userId: string) {
    const memberships = await this.memberService.listMemberships(userId)
    if (memberships.isLeft()) {
      const { code, message, status } = memberships.error
      throw new HttpException({ code, message }, status)
    }

    return { memberships: memberships.value }
  }

  @Get("rooms/:roomId/members")
  async listRoomMembers(
    @Param("roomId") roomId: string,
    @Body("userId") userId: string,
  ) {
    const members = await this.memberService.listRoomMembers({ roomId, userId })
    if (members.isLeft()) {
      const { code, message, status } = members.error
      throw new HttpException({ code, message }, status)
    }

    return { members: members.value }
  }
}
