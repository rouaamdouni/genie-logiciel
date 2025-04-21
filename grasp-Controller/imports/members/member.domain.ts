export class Member {
  constructor(
    public readonly room: string,
    public readonly user: string,
    public readonly joinedAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
