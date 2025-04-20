import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { ICompletedRewardRepo } from "../../completed_reward/config/i-completed-reward.repo"
import { IValidator } from "./interfaces/IValidator"
import { Left, Right } from "../../../utils/either"
import { RateRewardArgs } from "../i-rate-reward-use-case"

@Injectable()
export class RewardNotRatedValidator implements IValidator<RateRewardArgs> {
    constructor(
        @Inject(Repos.completedReward)
        private readonly completedRewardRepo: ICompletedRewardRepo,
    ) { }

    async validate(args: RateRewardArgs) {
        const reward = await this.completedRewardRepo.get({
            pathId: args.pathId,
            rewardId: args.rewardId,
            studentId: args.studentId,
        })

        if (reward?.isRated) {
            return Left.create({
                code: "reward_rated",
                message: "Reward is already rated",
                status: HttpStatus.BAD_REQUEST,
            })
        }

        return Right.create()
    }
}
