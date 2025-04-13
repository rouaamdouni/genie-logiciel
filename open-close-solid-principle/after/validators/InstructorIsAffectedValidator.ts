import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { IAffectRepo } from "../../affect/config/i-affect.repo"
import { RateRewardArgs } from "./i-rate-reward-use-case"
import { IRateValidator } from "../interfaces/i-rate-validator"
import { Left, Right } from "../../../utils/either"

@Injectable()
export class InstructorIsAffectedValidator implements IRateValidator<RateRewardArgs> {
    constructor(@Inject("AffectRepo") private readonly affectRepo: IAffectRepo) { }

    async validate(args: RateRewardArgs) {
        const affect = await this.affectRepo.get(args.instructorId, args.pathId)
        if (!affect) {
            return Left.create({
                code: "not_affected",
                message: "Instructor is not affected by this path",
                status: HttpStatus.BAD_REQUEST,
            })
        }
        return Right.create()
    }
}
