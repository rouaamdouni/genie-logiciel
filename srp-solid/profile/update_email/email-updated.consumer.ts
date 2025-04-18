import { Process, Processor } from "@nestjs/bull"
import { Inject } from "@nestjs/common"
import { Job } from "bull"
import { NewEmailUpdatedArgs } from "./email-updated-event"
import { Jobs, Queues, Repos, Services } from "../../utils/constants"
import { IUserRepo } from "../interfaces/i-user.repo"
import { IMailService } from "../interfaces/i-mail-service.repo"
import { IWhiteListRepo } from "../interfaces/i-white-list-repo"

@Processor(Queues.emailUpdated)
export class EmailUpdatedConsumer {
  constructor(
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Services.mail) private readonly mailService: IMailService,
    @Inject(Repos.whiteList) private readonly whiteListRepo: IWhiteListRepo,
  ) {}

  @Process(Jobs.newEmailUpdated)
  async newEmailUpdated({ data }: Job<NewEmailUpdatedArgs>) {
    const existingUser = await this.userRepo.getById(data.userId)
    if (!existingUser) return

    await this.mailService.sendEmail({
      from: process.env.FROM_EMAIL,
      subject: "email updated",
      text: `Hello ${existingUser.fullName} your email is updated from
      ${data.oldEmail} to ${data.newEmail}. You are being logged of from all the devices.`,
      to: [data.newEmail, data.oldEmail],
    })

    await this.whiteListRepo.clear(data.userId)
  }
}
