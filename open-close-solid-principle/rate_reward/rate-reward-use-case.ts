import { Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Right } from "../../../utils/either"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { INodeCompletedEvent } from "../../completed_node/node_completed/node-completed.event"
import { ICompletedRewardRepo } from "../../completed_reward/config/i-completed-reward.repo"
import { IRewardRepo } from "../../reward/config/i-reward.repo"
import { IValidator } from "../interfaces/IValidator"
import {
  IRateRewardUseCase,
  RateRewardArgs,
  RateRewardResult,
} from "./i-rate-reward-use-case"

@Injectable()
export class RateRewardUseCase implements IRateRewardUseCase {
  constructor(
    @Inject(Repos.RateRewardValidators)
    private readonly validators: IValidator<RateRewardArgs>[],

    @Inject(Repos.reward) private readonly rewardRepo: IRewardRepo,
    @Inject(Repos.completedReward) private readonly completedRewardRepo: ICompletedRewardRepo,
    @Inject(Repos.completedNode) private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Events.completedNode) private readonly completedNodeEvent: INodeCompletedEvent,
  ) { }

  async execute(args: RateRewardArgs): Promise<RateRewardResult> {
    for (const validator of this.validators) {
      const result = await validator.validate(args)
      if (result.isLeft()) return result
    }

    const updatedAt = new Date()

    const completedReward = await this.completedRewardRepo.get({
      pathId: args.pathId,
      rewardId: args.rewardId,
      studentId: args.studentId,
    })

    const completedNode = await this.completedNodeRepo.get(
      args.studentId,
      args.pathId,
      args.rewardId,
    )

    await this.completedRewardRepo.save({
      ...completedReward!,
      feedbackDocumentURL: args.feedbackDocumentURL,
      isCompleted: true,
      isRated: true,
      score: args.rate,
      updatedAt,
    })

    await this.completedNodeRepo.save({
      ...completedNode!,
      isCompleted: true,
      score: args.rate,
      updatedAt,
    })

    await this.completedNodeEvent.newCompletedNode({
      entityId: args.rewardId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    return Right.create({
      isSuccess: true,
      message: "Reward rated successfully",
      payload: {
        instructorId: args.instructorId,
        pathId: args.pathId,
        rewardId: args.rewardId,
        studentId: args.studentId,
      },
    })
  }
}
