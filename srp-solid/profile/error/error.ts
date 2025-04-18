// types/errors.ts
export type InvalidCredentials = {
    code: "invalid_credentials";
    message: string;
    status: number;
  };
  
  export type UserAlreadyExist = {
    code: "taken_credentials";
    message: string;
    status: number;
  };
  
  export type ErrorResponse = InvalidCredentials | UserAlreadyExist;
  