export type Either<E, T> = Left<E> | Right<T>

export class Left<T> {
  readonly error: T

  private constructor(error: T) {
    this.error = error
  }

  static create<U>(value: U): Left<U> {
    return new Left(value)
  }

  isLeft(): this is Left<T> {
    return true
  }

  isRight(): this is Right<never> {
    return false
  }
}

export class Right<T> {
  readonly value: T

  private constructor(value: T) {
    this.value = value
  }

  static create<U>(value: U): Right<U> {
    return new Right(value)
  }

  isLeft(): this is Left<never> {
    return false
  }

  isRight(): this is Right<T> {
    return true
  }
}
