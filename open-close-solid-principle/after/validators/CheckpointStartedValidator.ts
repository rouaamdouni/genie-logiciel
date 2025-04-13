import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { ICompletedCheckpointRepo } from "../../completed_checkpoint/config/i-completed-checkpoint.repo"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { IRateValidator } from "./interfaces/IRateValidator"
import { Left, Right } from "../../../utils/either"
import { RateCheckpointArgs } from "../i-rate-checkpoint-use-case"

@Injectable()
export class CheckpointStartedValidator implements IRateValidator<RateCheckpointArgs> {
    constructor(
        @Inject(Repos.completedCheckpoint)
        private readonly completedCheckpointRepo: ICompletedCheckpointRepo,
        @Inject(Repos.completedNode)
        private readonly completedNodeRepo: ICompletedNodeRepo,
    ) { }

    async validate(args: RateCheckpointArgs) {
        const completedNode = await this.completedNodeRepo.get(
            args.studentId,
            args.pathId,
            args.checkpointId,
        )
        const completedCheckpoint = await this.completedCheckpointRepo.get({
            checkpointId: args.checkpointId,
            pathId: args.pathId,
            studentId: args.studentId,
        })

        if (!completedNode || !completedCheckpoint) {
            return Left.create({
                code: "checkpoint_not_started",
                message: "Checkpoint has not been started",
                status: HttpStatus.BAD_REQUEST,
            })
        }

        return Right.create()
    }
}
