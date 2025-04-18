import { InjectQueue } from "@nestjs/bull"
import { Injectable } from "@nestjs/common"
import { Queue } from "bull"

import { Jobs, Queues } from "../../utils/constants"

export interface IPasswordUpdatedEvent {
  newPasswordUpdated(args: NewPasswordUpdatedArgs): Promise<void>
}
export type NewPasswordUpdatedArgs = { userId: string }

@Injectable()
export class PasswordUpdatedEvent implements IPasswordUpdatedEvent {
  constructor(
    @InjectQueue(Queues.passwordUpdated)
    private readonly passwordUpdatedQueue: Queue,
  ) {}

  async newPasswordUpdated(args: NewPasswordUpdatedArgs): Promise<void> {
    await this.passwordUpdatedQueue.add(Jobs.newPasswordUpdated, args)
  }
}
