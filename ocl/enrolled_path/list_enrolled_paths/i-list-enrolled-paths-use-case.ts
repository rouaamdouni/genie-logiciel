import { Either } from "../../../utils/either"
import { EnrolledPathDTO } from "../config/enrolled-path.dto"

export interface IListEnrolledPathsUseCase {
  execute(studentId: string): Promise<ListEnrolledPathsResult>
}

export type ListEnrolledPathsResult = Either<never, Array<EnrolledPathDTO>>
