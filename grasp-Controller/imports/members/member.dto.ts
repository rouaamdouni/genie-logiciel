export class MemberDTO {
  constructor(
    public readonly room: string,
    public readonly user: string,
    public readonly joinedAt: Date,
  ) {}
}
