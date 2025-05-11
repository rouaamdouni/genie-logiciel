import { InvalidCredentials } from "../../utils/types";

export class AuthenticationErrorService {
  static invalidCredentials(): InvalidCredentials {
    return {
      code: "invalid_credentials",
      message: "Invalid credentials",
      status: 400,
    };
  }
}
