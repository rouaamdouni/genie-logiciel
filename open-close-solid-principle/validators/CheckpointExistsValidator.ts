import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { ICheckpointRepo } from "../../checkpoint/config/i-checkpoint.repo"
import { IValidator } from "./interfaces/IValidator"
import { Left, Right } from "../../../utils/either"
import { RateCheckpointArgs } from "../i-rate-checkpoint-use-case"

@Injectable()
export class CheckpointExistsValidator implements IValidator<RateCheckpointArgs> {
    constructor(
        @Inject(Repos.checkpoint)
        private readonly checkpointRepo: ICheckpointRepo,
    ) { }

    async validate(args: RateCheckpointArgs) {
        const checkpoint = await this.checkpointRepo.getById(args.checkpointId)
        if (!checkpoint) {
            return Left.create({
                code: "checkpoint_not_found",
                message: "Checkpoint does not exist",
                status: HttpStatus.NOT_FOUND,
            })
        }
        return Right.create()
    }
}
