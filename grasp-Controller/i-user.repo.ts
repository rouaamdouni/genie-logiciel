import { User } from "./user.domain"

export interface IUserRepo {
  getByEmail(email: string): Promise<null | User>
  getById(userId: string): Promise<null | User>
  list(args?: ListUsersArgs): Promise<Array<User>>
  save(args: User): Promise<User>
}

export type ListUsersArgs = { role?: string }
