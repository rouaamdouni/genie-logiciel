import { IUserRepo } from "./interfaces/i-user.repo";

export class UserCommandService {
  constructor(private readonly userRepo: IUserRepo) {}

  async saveUser(user: any) {
    await this.userRepo.save(user);
  }
}
