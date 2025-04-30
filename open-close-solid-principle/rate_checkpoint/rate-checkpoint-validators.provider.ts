import { Injectable } from "@nestjs/common"
import {
    StudentExistsValidator,
    PathExistsValidator,
    InstructorIsAffectedValidator,
    StudentIsEnrolledValidator,
    CheckpointExistsValidator,
    CheckpointInPathValidator,
    CheckpointStartedValidator,
    CheckpointNotRatedValidator,
} from "../validators"
import { IValidator } from "../interfaces/IRateValidator"
import { RateCheckpointArgs } from "./i-rate-checkpoint-use-case"
@Injectable()
export class RateCheckpointValidatorsProvider {
    constructor(
        private readonly studentValidator: StudentExistsValidator,
        private readonly pathValidator: PathExistsValidator,
        private readonly instructorValidator: InstructorIsAffectedValidator,
        private readonly enrolledValidator: StudentIsEnrolledValidator,
        private readonly checkpointValidator: CheckpointExistsValidator,
        private readonly inPathValidator: CheckpointInPathValidator,
        private readonly startedValidator: CheckpointStartedValidator,
        private readonly notRatedValidator: CheckpointNotRatedValidator,
    ) { }

    getValidators(): IValidator<RateCheckpointArgs>[] {
        return [
            this.studentValidator,
            this.pathValidator,
            this.instructorValidator,
            this.enrolledValidator,
            this.checkpointValidator,
            this.inPathValidator,
            this.startedValidator,
            this.notRatedValidator,
        ]
    }
}
