import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { IUserRepo } from "../../user/config/i-user.repo"
import { IValidator } from "../interfaces/i-rate-validator"
import { RateRewardArgs } from "./i-rate-reward-use-case"
import { Left, Right } from "../../../utils/either"
import { DomainError } from "../../../utils/types"

@Injectable()
export class StudentExistsValidator implements IValidator<RateRewardArgs> {
    constructor(@Inject("UserRepo") private readonly userRepo: IUserRepo) { }

    async validate(args: RateRewardArgs) {
        const user = await this.userRepo.getById(args.studentId)
        if (!user) {
            return Left.create<DomainError>({
                code: "user_not_found",
                message: "student does not exist",
                status: HttpStatus.NOT_FOUND,
            })
        }
        return Right.create()
    }
}
