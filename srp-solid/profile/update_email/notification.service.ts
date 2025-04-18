import { IEmailUpdatedEvent } from "./email-updated-event";

export class NotificationService {
  constructor(private readonly emailUpdatedEvent: IEmailUpdatedEvent) {}

  async sendEmailUpdatedEvent(newEmail: string, oldEmail: string, userId: string) {
    await this.emailUpdatedEvent.newEmailUpdated({
      newEmail,
      oldEmail,
      userId,
    });
  }
}
