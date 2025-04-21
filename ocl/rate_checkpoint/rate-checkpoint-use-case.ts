import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { IAffectRepo } from "../../affect/config/i-affect.repo"
import { ICheckpointRepo } from "../../checkpoint/config/i-checkpoint.repo"
import { ICompletedCheckpointRepo } from "../../completed_checkpoint/config/i-completed-checkpoint.repo"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { INodeCompletedEvent } from "../../completed_node/node_completed/node-completed.event"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { IPathRepo } from "../../path/config/i-path.repo"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { IUserRepo } from "../../user/config/i-user.repo"
import {
  IRateCheckpointUseCase,
  RateCheckpointArgs,
  RateCheckpointResult,
} from "./i-rate-checkpoint-use-case"

@Injectable()
export class RateCheckpointUseCase implements IRateCheckpointUseCase {
  constructor(
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.user) private readonly userRepo: IUserRepo,
    @Inject(Repos.checkpoint) private readonly checkpointRepo: ICheckpointRepo,
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.affect) private readonly affectRepo: IAffectRepo,
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedCheckpoint)
    private readonly completedCheckpointRepo: ICompletedCheckpointRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Events.completedNode)
    private readonly completedNodeEvent: INodeCompletedEvent,
  ) {}

  async execute(args: RateCheckpointArgs): Promise<RateCheckpointResult> {
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

    const existingCheckpoint = await this.checkpointRepo.getById({
      checkpointId: args.checkpointId,
    })
    if (!existingCheckpoint)
      return Left.create({
        code: "checkpoint_not_found",
        message: "checkpoint does not exist",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPathItem = await this.pathItemRepo.get({
      entityId: args.checkpointId,
      pathId: args.pathId,
    })

    if (!existingPathItem)
      return Left.create({
        code: "entity_not_in_path",
        message: "checkpoint not path item",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedNode = await this.completedNodeRepo.get({
      entityId: args.checkpointId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    if (!existingCompletedNode)
      return Left.create({
        code: "checkpoint_not_started",
        message: "student didn't start this checkpoint",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedCheckpoint = await this.completedCheckpointRepo.get({
      checkpointId: args.checkpointId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    if (!existingCompletedCheckpoint)
      return Left.create({
        code: "checkpoint_not_started",
        message: "student didn't start this checkpoint",
        status: HttpStatus.BAD_REQUEST,
      })

    if (existingCompletedCheckpoint.isRated)
      return Left.create({
        code: "checkpoint_rated",
        message: "this checkpoint is already rated",
        status: HttpStatus.BAD_REQUEST,
      })

    const updatedAt = new Date()

    await this.completedCheckpointRepo.save({
      ...existingCompletedCheckpoint,
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
      entityId: args.checkpointId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    return Right.create({
      isSuccess: true,
      message: "Checkpoint rated successfully",
      payload: {
        checkpointId: args.checkpointId,
        instructorId: args.instructorId,
        pathId: args.pathId,
        studentId: args.studentId,
      },
    })
  }
}
