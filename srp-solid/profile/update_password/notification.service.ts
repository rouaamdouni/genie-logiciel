// services/notification.service.ts
import { IPasswordUpdatedEvent } from "./password-updated-event";

export class NotificationService {
  constructor(private readonly passwordUpdatedEvent: IPasswordUpdatedEvent) {}

  async sendPasswordUpdatedEvent(userId: string) {
    await this.passwordUpdatedEvent.newPasswordUpdated({ userId });
  }
}
