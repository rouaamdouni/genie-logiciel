import {  Injectable } from "@nestjs/common";
import { IUpdateProfileUseCase, UpdateProfileArgs, UpdateProfileResult } from "./i-update-profile-use-case";
import { Left, Right } from "../../utils/either";
import { ErrorService } from "../error/error.service";
import { UserService } from "../user.service";

@Injectable()
export class UpdateProfileUseCase implements IUpdateProfileUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(args: UpdateProfileArgs): Promise<UpdateProfileResult> {
    const existingUser = await this.userService.getUserById(args.userId);
    if (!existingUser) {
      return Left.create(ErrorService.userNotFound());
    }

    existingUser.updatedAt = new Date();
    await this.userService.saveUser({
      ...existingUser,
      ...args,
    });

    return Right.create({
      isSuccess: true,
      message: "Profile updated successfully",
      payload: { userId: args.userId },
    });
  }
}
