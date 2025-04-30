import { Injectable } from "@nestjs/common"
import {
    StudentExistsValidator,
    StudentIsEnrolledValidator,
    ChallengeExistsValidator,
    ChallengeNotRatedValidator,
    InstructorIsAffectedValidator,
} from "../validators"
import { IValidator } from "../interfaces/IRateValidator"
import { RateChallengeArgs } from "./i-rate-checkpoint-use-case"

@Injectable()
export class RateChallengeValidatorsProvider {
    constructor(
        private readonly studentValidator: StudentExistsValidator,
        private readonly enrolledValidator: StudentIsEnrolledValidator,
        private readonly challengeValidator: ChallengeExistsValidator,
        private readonly notRatedValidator: ChallengeNotRatedValidator,
        private readonly instructorValidator: InstructorIsAffectedValidator,
    ) { }

    getValidators(): IValidator<RateChallengeArgs>[] {
        return [
            this.studentValidator,
            this.enrolledValidator,
            this.challengeValidator,
            this.notRatedValidator,
            this.instructorValidator,
        ]
    }
}
