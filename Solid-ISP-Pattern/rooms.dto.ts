//for imports
export class RoomDTO {
  constructor(
    public readonly roomId: string,
    public readonly creator: string,
    public readonly slug: string,
    public readonly label: string,
    public readonly roomAvatarURL: string,
    public readonly isPublic: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
