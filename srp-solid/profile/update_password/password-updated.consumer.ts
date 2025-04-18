import { Process, Processor } from "@nestjs/bull"
import { Inject } from "@nestjs/common"
import { Job } from "bull"
import { Jobs, Queues, Repos, Services } from "../../utils/constants"
import { IUserRepo } from "../interfaces/i-user.repo"
import { IMailService } from "../interfaces/i-mail-service.repo"
import { IWhiteListRepo } from "../interfaces/i-white-list-repo"
import { NewPasswordUpdatedArgs } from "./password-updated-event"

@Processor(Queues.passwordUpdated)
export class PasswordUpdatedConsumer {
  constructor(
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Services.mail) private readonly mailService: IMailService,
    @Inject(Repos.whiteList)
    private readonly whiteListRepository: IWhiteListRepo,
  ) {}

  @Process(Jobs.newPasswordUpdated)
  async newPasswordUpdated({ data }: Job<NewPasswordUpdatedArgs>) {
    const existingUser = await this.userRepo.getById(data.userId)
    if (!existingUser) return

    await this.mailService.sendEmail({
      from: process.env.FROM_EMAIL,
      subject: "password updated",
      text: `Hello ${existingUser.fullName} your password 
      is updated successfully. You are being logged of from all the devices.`,
      to: existingUser.email,
    })

    await this.whiteListRepository.clear(data.userId)
  }
}
