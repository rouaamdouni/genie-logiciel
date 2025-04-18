// services/password.service.ts
import { IHash } from "../../utils/hashing";

export class PasswordService {
  constructor(private readonly hashService: IHash) {}

  async comparePasswords(inputPassword: string, storedPassword: string) {
    return await this.hashService.compare(inputPassword, storedPassword);
  }

  async hashPassword(password: string) {
    return await this.hashService.hash(password);
  }
}
