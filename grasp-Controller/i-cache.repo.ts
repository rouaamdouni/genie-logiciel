export interface ICacheRepo<T> {
  clear(key: string): Promise<void>
  list(key: string): Promise<Array<T>>
  push(key: string, value: any): Promise<void>
  remove(key: string, element: any): Promise<void>
  search(key: string, element: T): Promise<number>
}
