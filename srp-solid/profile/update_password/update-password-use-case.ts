import { Injectable } from "@nestjs/common";
import { IUpdatePasswordUseCase, UpdatePasswordArgs, UpdatePasswordResult } from "./i-update-password-use-case";
import { PasswordService } from "./password.service";
import { Left, Right } from "../../utils/either";
import { UserService } from "../user.service";
import { ErrorService } from "../error/error.service";
import { NotificationService } from "../../notification.service";

@Injectable()
export class UpdatePasswordUseCase implements IUpdatePasswordUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly notificationService: NotificationService
  ) {}

  async execute(args: UpdatePasswordArgs): Promise<UpdatePasswordResult> {
    const existingUser = await this.userService.getUserById(args.userId);
    if (!existingUser) {
      return Left.create(ErrorService.userNotFound());
    }

    const isValidPassword = await this.passwordService.comparePasswords(args.userPassword, existingUser.password);
    if (!isValidPassword) {
      return Left.create(ErrorService.invalidCredentials());
    }

    const hashedPassword = await this.passwordService.hashPassword(args.newPassword);
    
    existingUser.password = hashedPassword;
    existingUser.updatedAt = new Date();
    
    await this.userService.saveUser(existingUser);
    await this.notificationService.sendPasswordUpdatedEvent(existingUser.userId);

    return Right.create({
      isSuccess: true,
      message: "Password updated successfully",
      payload: { userId: args.userId },
    });
  }
}
