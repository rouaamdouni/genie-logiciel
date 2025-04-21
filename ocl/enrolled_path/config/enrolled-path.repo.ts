import { Inject, Injectable } from "@nestjs/common/decorators/core"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { EnrolledPathDocument } from "../../../../database/mongo/models/enrolled-path"
import { EnrolledPath } from "./enrolled-path.domain"
import { EnrolledPathDTO } from "./enrolled-path.dto"
import { GetEnrolledPathArgs, IEnrolledPathRepo } from "./i-enrolled-path.repo"

@Injectable()
export class EnrolledPathRepo implements IEnrolledPathRepo {
  constructor(
    @InjectModel(Models.enrolledPaths)
    private enrolledPathModel: Model<EnrolledPathDocument>,
    @Inject(Mappers.enrolledPath)
    private enrolledPathMapper: IMapper<EnrolledPath, EnrolledPathDTO>,
  ) {}

  async get(args: GetEnrolledPathArgs): Promise<EnrolledPath | null> {
    const existingEnrolledPath = await this.enrolledPathModel.findOne({
      deletedAt: { $exists: false },
      path: new Types.ObjectId(args.pathId),
      student: new Types.ObjectId(args.studentId),
    })

    return existingEnrolledPath
      ? this.enrolledPathMapper.toDomain(existingEnrolledPath)
      : null
  }

  async listByPathId(pathId: string): Promise<Array<EnrolledPath>> {
    const enrolledPaths = await this.enrolledPathModel.find({
      deletedAt: { $exists: false },
      path: new Types.ObjectId(pathId),
    })

    return enrolledPaths.map(this.enrolledPathMapper.toDomain)
  }

  async listByStudentId(studentId: string): Promise<Array<EnrolledPath>> {
    const enrolledPaths = await this.enrolledPathModel.find({
      deletedAt: { $exists: false },
      student: new Types.ObjectId(studentId),
    })

    return enrolledPaths.map(this.enrolledPathMapper.toDomain)
  }

  async save(args: EnrolledPath): Promise<void> {
    await this.enrolledPathModel.findOneAndUpdate(
      {
        path: new Types.ObjectId(args.path),
        student: new Types.ObjectId(args.student),
      },
      this.enrolledPathMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
