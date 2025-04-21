import { Either } from "../../../utils/either"
import { StudentNotEnrolled } from "../../../utils/types"
import { EnrolledPathDTO } from "../config/enrolled-path.dto"

export type GetEnrolledPathArgs = {
  pathId: string
  studentId: string
}

export type GetEnrolledPathResult = Either<StudentNotEnrolled, EnrolledPathDTO>

export interface IGetEnrolledPathUseCase {
  execute(args: GetEnrolledPathArgs): Promise<GetEnrolledPathResult>
}
