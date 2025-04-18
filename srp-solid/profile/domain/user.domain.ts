import { Role } from "../../utils/constants";

export class User {
  constructor(
    public userId: string,
    public email: string,
    public password: string,
    public fullName: string,
    public role: Role,
    public avatarURL: string,
    public preferredLanguage: string,
    public isConfirmed: boolean,
    public createdAt: Date,
    public updatedAt: Date,
    public deletedAt?: Date,
  ) {}
}
