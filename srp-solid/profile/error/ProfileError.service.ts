import { UserAlreadyExist, UserNotFound } from "../../utils/types";

export class ProfileErrorService {
  static userAlreadyExist(): UserAlreadyExist {
    return {
      code: "taken_credentials",
      message: "User already exists",
      status: 400,
    };
  }

  static userNotFound(): UserNotFound {
    return {
      code: "user_not_found",
      message: "User not found",
      status: 404,
    };
  }
}
