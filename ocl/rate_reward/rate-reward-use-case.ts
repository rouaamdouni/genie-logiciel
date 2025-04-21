import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { IAffectRepo } from "../../affect/config/i-affect.repo"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { INodeCompletedEvent } from "../../completed_node/node_completed/node-completed.event"
import { ICompletedRewardRepo } from "../../completed_reward/config/i-completed-reward.repo"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { IPathRepo } from "../../path/config/i-path.repo"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { IRewardRepo } from "../../reward/config/i-reward.repo"
import { IUserRepo } from "../../user/config/i-user.repo"
import {
  IRateRewardUseCase,
  RateRewardArgs,
  RateRewardResult,
} from "./i-rate-reward-use-case"

@Injectable()
export class RateRewardUseCase implements IRateRewardUseCase {
  constructor(
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Repos.reward) private readonly rewardRepo: IRewardRepo,
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.affect) private readonly affectRepo: IAffectRepo,
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedReward)
    private readonly completedRewardRepo: ICompletedRewardRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Events.completedNode)
    private readonly completedNodeEvent: INodeCompletedEvent,
  ) {}

  async execute(args: RateRewardArgs): Promise<RateRewardResult> {
    const existingUser = await this.userRepo.getById(args.studentId)
    if (!existingUser)
      return Left.create({
        code: "user_not_found",
        message: "student does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPath = await this.pathRepo.getById({ pathId: args.pathId })
    if (!existingPath)
      return Left.create({
        code: "path_not_found",
        message: "path not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingAffect = await this.affectRepo.get({
      instructorId: args.instructorId,
      pathId: args.pathId,
    })

    if (!existingAffect)
      return Left.create({
        code: "not_affected",
        message: "instructor is not affected",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingEnrolledPath = await this.enrolledPathRepo.get({
      pathId: args.pathId,
      studentId: args.studentId,
    })

    if (!existingEnrolledPath)
      return Left.create({
        code: "path_not_enrolled",
        message: "student is not enrolled",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingReward = await this.rewardRepo.getById({
      rewardId: args.rewardId,
    })

    if (!existingReward)
      return Left.create({
        code: "reward_not_found",
        message: "reward does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPathItem = await this.pathItemRepo.get({
      entityId: args.rewardId,
      pathId: args.pathId,
    })

    if (!existingPathItem)
      return Left.create({
        code: "entity_not_in_path",
        message: "reward not path item",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedNode = await this.completedNodeRepo.get({
      entityId: args.rewardId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    if (!existingCompletedNode)
      return Left.create({
        code: "reward_not_started",
        message: "student didn't start this reward",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedReward = await this.completedRewardRepo.get({
      pathId: args.pathId,
      rewardId: args.rewardId,
      studentId: args.studentId,
    })

    if (!existingCompletedReward)
      return Left.create({
        code: "reward_not_started",
        message: "student didn't start this reward",
        status: HttpStatus.BAD_REQUEST,
      })

    if (existingCompletedReward.isRated)
      return Left.create({
        code: "reward_rated",
        message: "this reward is already rated",
        status: HttpStatus.BAD_REQUEST,
      })

    const updatedAt = new Date()

    await this.completedRewardRepo.save({
      ...existingCompletedReward,
      feedbackDocumentURL: args.feedbackDocumentURL,
      isCompleted: true,
      isRated: true,
      score: args.rate,
      updatedAt,
    })

    await this.completedNodeRepo.save({
      ...existingCompletedNode,
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
