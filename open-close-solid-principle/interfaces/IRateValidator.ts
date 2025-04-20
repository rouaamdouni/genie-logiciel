// interfaces/i-rate-validator.ts
import { Either } from "../../../utils/either"
import { DomainError } from "../../../utils/types"

export interface IRateValidator<T> {
    validate(args: T): Promise<Either<DomainError, void>>
}
