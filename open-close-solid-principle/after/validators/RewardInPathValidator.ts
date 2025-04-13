import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { IRateValidator } from "./interfaces/IRateValidator"
import { Left, Right } from "../../../utils/either"
import { RateRewardArgs } from "../i-rate-reward-use-case"

@Injectable()
export class RewardInPathValidator implements IRateValidator<RateRewardArgs> {
    constructor(
        @Inject(Repos.pathItem)
        private readonly pathItemRepo: IPathItemRepo,
    ) { }

    async validate(args: RateRewardArgs) {
        const item = await this.pathItemRepo.get(args.pathId, args.rewardId)
        if (!item) {
            return Left.create({
                code: "entity_not_in_path",
                message: "Reward is not in path",
                status: HttpStatus.BAD_REQUEST,
            })
        }
        return Right.create()
    }
}
