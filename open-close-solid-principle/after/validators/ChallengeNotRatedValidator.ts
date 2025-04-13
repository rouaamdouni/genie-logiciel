import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { IEnrolledChallengeRepo } from "../../enrolled_challenge/config/i-enrolled-challenge.repo"
import { IRateValidator } from "./interfaces/IRateValidator"
import { Left, Right } from "../../../utils/either"
import { RateChallengeArgs } from "./i-rate-challenge-use-case"

@Injectable()
export class ChallengeNotRatedValidator implements IRateValidator<RateChallengeArgs> {
    constructor(
        @Inject(Repos.enrolledChallenge)
        private readonly enrolledChallengeRepo: IEnrolledChallengeRepo,
    ) { }

    async validate(args: RateChallengeArgs) {
        const enrolled = await this.enrolledChallengeRepo.get(
            args.studentId,
            args.challengeId,
        )

        if (enrolled?.isRated) {
            return Left.create({
                code: "challenge_already_rated",
                message: "Challenge has already been rated",
                status: HttpStatus.BAD_REQUEST,
            })
        }

        return Right.create()
    }
}
