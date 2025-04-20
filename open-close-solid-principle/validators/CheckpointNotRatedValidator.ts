import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { ICompletedCheckpointRepo } from "../../completed_checkpoint/config/i-completed-checkpoint.repo"
import { IValidator } from "./interfaces/IValidator"
import { Left, Right } from "../../../utils/either"
import { RateCheckpointArgs } from "../i-rate-checkpoint-use-case"

@Injectable()
export class CheckpointNotRatedValidator implements IValidator<RateCheckpointArgs> {
    constructor(
        @Inject(Repos.completedCheckpoint)
        private readonly completedCheckpointRepo: ICompletedCheckpointRepo,
    ) { }

    async validate(args: RateCheckpointArgs) {
        const checkpoint = await this.completedCheckpointRepo.get({
            checkpointId: args.checkpointId,
            pathId: args.pathId,
            studentId: args.studentId,
        })

        if (checkpoint?.isRated) {
            return Left.create({
                code: "checkpoint_rated",
                message: "Checkpoint has already been rated",
                status: HttpStatus.BAD_REQUEST,
            })
        }

        return Right.create()
    }
}
