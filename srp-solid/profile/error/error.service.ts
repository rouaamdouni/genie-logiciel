// services/error.service.ts

import { InvalidCredentials, UserAlreadyExist, UserNotFound } from "../../utils/types";


export class ErrorService {
  static invalidCredentials(): InvalidCredentials {
    return {
      code: "invalid_credentials",
      message: "Invalid credentials",
      status: 400,
    };
  }

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
