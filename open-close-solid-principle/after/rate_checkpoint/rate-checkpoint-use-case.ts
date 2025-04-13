import { Inject, Injectable } from "@nestjs/common"
import { Events, Repos } from "../../../utils/constants"
import { Right } from "../../../utils/either"
import {
  IRateCheckpointUseCase,
  RateCheckpointArgs,
  RateCheckpointResult,
} from "./i-rate-checkpoint-use-case"
import { IRateValidator } from "../interfaces/IRateValidator"
import { ICompletedCheckpointRepo } from "../../completed_checkpoint/config/i-completed-checkpoint.repo"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { INodeCompletedEvent } from "../../completed_node/node_completed/node-completed.event"

@Injectable()
export class RateCheckpointUseCase implements IRateCheckpointUseCase {
  constructor(
    @Inject(Repos.RateCheckpointValidators)
    private readonly validators: IRateValidator<RateCheckpointArgs>[],

    @Inject(Repos.completedCheckpoint)
    private readonly completedCheckpointRepo: ICompletedCheckpointRepo,

    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,

    @Inject(Events.completedNode)
    private readonly completedNodeEvent: INodeCompletedEvent,
  ) { }

  async execute(args: RateCheckpointArgs): Promise<RateCheckpointResult> {
    for (const validator of this.validators) {
      const result = await validator.validate(args)
      if (result.isLeft()) return result
    }

    const existingCompletedCheckpoint = await this.completedCheckpointRepo.get({
      checkpointId: args.checkpointId,
      pathId: args.pathId,
      studentId: args.studentId,
    })

    const existingCompletedNode = await this.completedNodeRepo.get(
      args.studentId,
      args.pathId,
      args.checkpointId,
    )

    const updatedAt = new Date()

    await this.completedCheckpointRepo.save({
      ...existingCompletedCheckpoint!,
      feedbackDocumentURL: args.feedbackDocumentURL,
      isCompleted: true,
      isRated: true,
      score: args.rate,
      updatedAt,
    })

    await this.completedNodeRepo.save({
      ...existingCompletedNode!,
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
