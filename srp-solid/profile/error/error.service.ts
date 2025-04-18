// services/error.service.ts
import { InvalidCredentials, UserAlreadyExist } from "../types/errors";

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

  static userNotFound(): UserAlreadyExist {
    return {
      code: "taken_credentials",
      message: "User not found",
      status: 404,
    };
  }
}
