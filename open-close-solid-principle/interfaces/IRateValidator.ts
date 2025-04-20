// interfaces/i-rate-validator.ts
import { Either } from "../../../utils/either"
import { DomainError } from "../../../utils/types"

export interface IValidator<T> {
    validate(args: T): Promise<Either<DomainError, void>>
}
