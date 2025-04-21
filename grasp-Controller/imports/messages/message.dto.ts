export class MessageDTO {
  constructor(
    public readonly messageId: string,
    public readonly sender: string,
    public readonly roomId: string,
    public readonly message: string,
    public readonly sentAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
