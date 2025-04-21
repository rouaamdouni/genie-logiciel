export interface IMapper<T, U> {
  toDomain(raw: any): T
  toDTO(domain: T): U
  toPersistence(domain: T): any
}
