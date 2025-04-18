import { User } from "../profile/domain/user.domain";
import { IUserRepo } from "../profile/interfaces/i-user.repo";
import { Either, Left, Right } from "./either";
import { IHash } from "./hashing";

export interface ICredentialsValidator {
  validate(userId: string, password: string): Promise<Either<ErrorResponse, User>>;
}

export type ErrorResponse = {
  code: string;
  message: string;
  status: number;
};

export class CredentialsValidator implements ICredentialsValidator {
  constructor(
    private userRepo: IUserRepo,
    private hashService: IHash
  ) {}

  async validate(userId: string, password: string): Promise<Either<ErrorResponse, User>> {
    const user = await this.userRepo.getById(userId);
    
    if (!user) {
      return Left.create({
        code: "user_not_found",
        message: "User not found",
        status: 404
      });
    }

    const isValid = await this.hashService.compare(password, user.password);
    return isValid 
      ?  Right.create(user)
      : Left.create({
          code: "invalid_credentials",
          message: "Invalid password",
          status: 401
        });
  }
}