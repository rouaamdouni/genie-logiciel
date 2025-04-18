import { IUserRepo } from "./interfaces/i-user.repo";

export class UserService {
  constructor(private readonly userRepo: IUserRepo) {}

  async getUserById(userId: string) {
    return await this.userRepo.getById(userId);
  }

  async saveUser(user: any) {
    await this.userRepo.save(user);
  }
}
