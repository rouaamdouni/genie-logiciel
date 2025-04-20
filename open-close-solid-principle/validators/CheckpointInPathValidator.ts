import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { Repos } from "../../../utils/constants"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { IValidator } from "./interfaces/IValidator"
import { Left, Right } from "../../../utils/either"
import { RateCheckpointArgs } from "../i-rate-checkpoint-use-case"

@Injectable()
export class CheckpointInPathValidator implements IValidator<RateCheckpointArgs> {
    constructor(
        @Inject(Repos.pathItem)
        private readonly pathItemRepo: IPathItemRepo,
    ) { }

    async validate(args: RateCheckpointArgs) {
        const item = await this.pathItemRepo.get(args.pathId, args.checkpointId)
        if (!item) {
            return Left.create({
                code: "entity_not_in_path",
                message: "Checkpoint is not in the path",
                status: HttpStatus.BAD_REQUEST,
            })
        }
        return Right.create()
    }
}
