import { Injectable } from "@nestjs/common";
import { IUpdateEmailUseCase, UpdateEmailArgs, UpdateEmailResult } from "./i-update-email-use-case";
import { IHash } from "../../utils/hashing";
import { Left, Right } from "../../utils/either";
import { UserService } from "../user.service";
import { NotificationService } from "../../notification.service";
import { ProfileErrorService } from "../error/ProfileError.service";
import { AuthenticationErrorService } from "../error/AuthenticationError.service";

@Injectable()
export class UpdateEmailUseCase implements IUpdateEmailUseCase {
  constructor(
    private readonly userService: UserService,
    private readonly hashService: IHash,
    private readonly notificationService: NotificationService
  ) {}

  async execute(args: UpdateEmailArgs): Promise<UpdateEmailResult> {
    const existingUser = await this.userService.getUserById(args.userId);
    if (!existingUser) 
      return Left.create(ProfileErrorService.userNotFound());  

    const isValidPassword = await this.hashService.compare(args.userPassword, existingUser.password);
    if (!isValidPassword)  
      return Left.create(AuthenticationErrorService.invalidCredentials());  

    existingUser.email = args.newEmail;
    existingUser.updatedAt = new Date();

    await this.userService.saveUser(existingUser);
    await this.notificationService.sendEmailUpdatedEvent(
      args.newEmail,
      existingUser.email,
      existingUser.userId
    );

    return Right.create({
      isSuccess: true,
      message: "Email updated successfully",
      payload: { userId: args.userId },
    });
  }
}
