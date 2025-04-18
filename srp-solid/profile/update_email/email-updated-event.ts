import { InjectQueue } from "@nestjs/bull"
import { Injectable } from "@nestjs/common"
import { Queue } from "bull"

import { Jobs, Queues } from "../../utils/constants"

export interface IEmailUpdatedEvent {
  newEmailUpdated(args: NewEmailUpdatedArgs): Promise<void>
}

export type NewEmailUpdatedArgs = {
  newEmail: string
  oldEmail: string
  userId: string
}

@Injectable()
export class EmailUpdatedEvent implements IEmailUpdatedEvent {
  constructor(
    @InjectQueue(Queues.emailUpdated) private readonly emailUpdatedQueue: Queue,
  ) {}

  async newEmailUpdated(args: NewEmailUpdatedArgs): Promise<void> {
    await this.emailUpdatedQueue.add(Jobs.newEmailUpdated, args)
  }
}
