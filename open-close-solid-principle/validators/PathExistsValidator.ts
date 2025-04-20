import { Inject, Injectable, HttpStatus } from "@nestjs/common"
import { IPathRepo } from "../../path/config/i-path.repo"
import { RateRewardArgs } from "./i-rate-reward-use-case"
import { IValidator } from "../interfaces/i-rate-validator"
import { Left, Right } from "../../../utils/either"

@Injectable()
export class PathExistsValidator implements IValidator<RateRewardArgs> {
    constructor(@Inject("PathRepo") private readonly pathRepo: IPathRepo) { }

    async validate(args: RateRewardArgs) {
        const path = await this.pathRepo.getById(args.pathId)
        if (!path) {
            return Left.create({
                code: "path_not_found",
                message: "Path not found",
                status: HttpStatus.NOT_FOUND,
            })
        }
        return Right.create()
    }
}
