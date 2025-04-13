import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { RateRewardArgs } from "./i-rate-reward-use-case"
import { IRateValidator } from "../interfaces/i-rate-validator"
import { Left, Right } from "../../../utils/either"

@Injectable()
export class StudentIsEnrolledValidator implements IRateValidator<RateRewardArgs> {
    constructor(@Inject("EnrolledPathRepo") private readonly enrolledPathRepo: IEnrolledPathRepo) { }

    async validate(args: RateRewardArgs) {
        const enrolled = await this.enrolledPathRepo.get(args.pathId, args.studentId)
        if (!enrolled) {
            return Left.create({
                code: "path_not_enrolled",
                message: "Student is not enrolled in the path",
                status: HttpStatus.BAD_REQUEST,
            })
        }
        return Right.create()
    }
}
