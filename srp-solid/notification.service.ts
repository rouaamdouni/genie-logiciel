// services/notification.service.ts

import { IEmailUpdatedEvent } from "./profile/update_email/email-updated-event";
import { IPasswordUpdatedEvent } from "./profile/update_password/password-updated-event";

export class NotificationService {
  constructor(
    private readonly emailUpdatedEvent: IEmailUpdatedEvent,
    private readonly passwordUpdatedEvent: IPasswordUpdatedEvent
  ) {}

  async sendEmailUpdatedEvent(newEmail: string, oldEmail: string, userId: string) {
    await this.emailUpdatedEvent.newEmailUpdated({
      newEmail,
      oldEmail,
      userId,
    });
  }

  async sendPasswordUpdatedEvent(userId: string) {
    await this.passwordUpdatedEvent.newPasswordUpdated({ userId });
  }
}