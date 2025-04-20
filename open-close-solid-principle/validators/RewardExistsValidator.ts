import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { IRewardRepo } from "../../reward/config/i-reward.repo"
import { RateRewardArgs } from "./i-rate-reward-use-case"
import { IValidator } from "../interfaces/i-rate-validator"
import { Left, Right } from "../../../utils/either"

@Injectable()
export class RewardExistsValidator implements IValidator<RateRewardArgs> {
    constructor(@Inject("RewardRepo") private readonly rewardRepo: IRewardRepo) { }

    async validate(args: RateRewardArgs) {
        const reward = await this.rewardRepo.getById(args.rewardId)
        if (!reward) {
            return Left.create({
                code: "reward_not_found",
                message: "Reward not found",
                status: HttpStatus.NOT_FOUND,
            })
        }
        return Right.create()
    }
}
