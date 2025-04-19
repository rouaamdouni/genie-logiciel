import { Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { IChallengeRepo } from "../../challenge/config/i-challenge.repo"
import { IRateValidator } from "./interfaces/IRateValidator"
import { Left, Right } from "../../../utils/either"
import { RateChallengeArgs } from "./i-rate-challenge-use-case"

@Injectable()
export class ChallengeExistsValidator implements IRateValidator<RateChallengeArgs> {
    constructor(
        @Inject(Repos.challenge)
        private readonly challengeRepo: IChallengeRepo,
    ) { }

    async validate(args: RateChallengeArgs) {
        const challenge = await this.challengeRepo.getById(args.challengeId)
        if (!challenge) {
            return Left.create({
                code: "challenge_not_found",
                message: "Challenge does not exist",
                status: HttpStatus.NOT_FOUND,
            })
        }
        return Right.create()
    }
}
