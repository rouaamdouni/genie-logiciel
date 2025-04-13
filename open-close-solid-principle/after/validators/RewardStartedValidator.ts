import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { ICompletedRewardRepo } from "../../completed_reward/config/i-completed-reward.repo"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { IRateValidator } from "./interfaces/IRateValidator"
import { Left, Right } from "../../../utils/either"
import { RateRewardArgs } from "../i-rate-reward-use-case"

@Injectable()
export class RewardStartedValidator implements IRateValidator<RateRewardArgs> {
    constructor(
        @Inject(Repos.completedReward)
        private readonly completedRewardRepo: ICompletedRewardRepo,
        @Inject(Repos.completedNode)
        private readonly completedNodeRepo: ICompletedNodeRepo,
    ) { }

    async validate(args: RateRewardArgs) {
        const completedNode = await this.completedNodeRepo.get(
            args.studentId,
            args.pathId,
            args.rewardId,
        )
        const completedReward = await this.completedRewardRepo.get({
            pathId: args.pathId,
            rewardId: args.rewardId,
            studentId: args.studentId,
        })

        if (!completedNode || !completedReward) {
            return Left.create({
                code: "reward_not_started",
                message: "Student didn't start the reward",
                status: HttpStatus.BAD_REQUEST,
            })
        }

        return Right.create()
    }
}
