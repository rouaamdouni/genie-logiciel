export class Message {
  constructor(
    public readonly messageId: string,
    public readonly sender: string,
    public readonly room: string,
    public readonly message: string,
    public readonly sentAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
