import { IUserRepo } from "./interfaces/i-user.repo";

export class UserQueryService {
  constructor(private readonly userRepo: IUserRepo) {}

  async getUserById(userId: string) {
    return await this.userRepo.getById(userId);
  }
}
