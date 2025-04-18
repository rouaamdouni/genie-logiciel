export interface IWhiteListRepo {
    add(userId: string, token: string): Promise<void>
    clear(userId: string): Promise<void>
    exists(userId: string, token: string): Promise<boolean>
    remove(userId: string, token: string): Promise<void>
  }
  