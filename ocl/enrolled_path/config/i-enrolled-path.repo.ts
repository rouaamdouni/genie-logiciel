import { EnrolledPath } from "./enrolled-path.domain"

export type GetEnrolledPathArgs = {
  pathId: string
  studentId: string
}

export interface IEnrolledPathRepo {
  get(args: GetEnrolledPathArgs): Promise<EnrolledPath | null>
  listByPathId(pathId: string): Promise<Array<EnrolledPath>>
  listByStudentId(studentId: string): Promise<Array<EnrolledPath>>
  save(args: EnrolledPath): Promise<void>
}
