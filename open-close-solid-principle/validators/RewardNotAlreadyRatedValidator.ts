import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { ICompletedRewardRepo } from "../../completed_reward/config/i-completed-reward.repo"
import { RateRewardArgs } from "./i-rate-reward-use-case"
import { IValidator } from "../interfaces/i-rate-validator"
import { Left, Right } from "../../../utils/either"

@Injectable()
export class RewardNotAlreadyRatedValidator implements IValidator<RateRewardArgs> {
    constructor(@Inject("CompletedRewardRepo") private readonly completedRewardRepo: ICompletedRewardRepo) { }

    async validate(args: RateRewardArgs) {
        const completed = await this.completedRewardRepo.get({
            rewardId: args.rewardId,
            pathId: args.pathId,
            studentId: args.studentId,
        })

        if (completed?.isRated) {
            return Left.create({
                code: "reward_already_rated",
                message: "This reward has already been rated",
                status: HttpStatus.BAD_REQUEST,
            })
        }

        return Right.create()
    }
}
