// rate-reward-validators.provider.ts
import { Injectable } from "@nestjs/common";
import {
    StudentExistsValidator,
    PathExistsValidator,
    InstructorIsAffectedValidator,
    StudentIsEnrolledValidator,
    RewardExistsValidator,
    RewardInPathValidator,
    RewardStartedValidator,
    RewardNotRatedValidator,
} from "../validators/index";
import { IValidator } from "../interfaces/IRateValidator";
import {
    RateRewardArgs,
} from "./i-rate-reward-use-case"

@Injectable()
export class RateRewardValidatorsProvider {
    constructor(
        private readonly studentValidator: StudentExistsValidator,
        private readonly pathValidator: PathExistsValidator,
        private readonly instructorValidator: InstructorIsAffectedValidator,
        private readonly enrolledValidator: StudentIsEnrolledValidator,
        private readonly rewardValidator: RewardExistsValidator,
        private readonly inPathValidator: RewardInPathValidator,
        private readonly startedValidator: RewardStartedValidator,
        private readonly notRatedValidator: RewardNotRatedValidator
    ) { }

    getValidators(): IValidator<RateRewardArgs>[] {
        return [
            this.studentValidator,
            this.pathValidator,
            this.instructorValidator,
            this.enrolledValidator,
            this.rewardValidator,
            this.inPathValidator,
            this.startedValidator,
            this.notRatedValidator,
        ];
    }
}
