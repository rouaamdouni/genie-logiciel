import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { CompletedCheckpointDocument } from "../../../../database/mongo/models/completed-checkpoint"
import { CompletedCheckpoint } from "./completed-checkpoint.domain"
import { CompletedCheckpointDTO } from "./completed-checkpoint.dto"
import {
  GetCompletedCheckpointArgs,
  ICompletedCheckpointRepo,
  ListCompletedCheckpointArgs,
} from "./i-completed-checkpoint.repo"

@Injectable()
export class CompletedCheckpointRepo implements ICompletedCheckpointRepo {
  constructor(
    @InjectModel(Models.completedCheckpoints)
    private completedCheckpointModel: Model<CompletedCheckpointDocument>,
    @Inject(Mappers.completedCheckpoint)
    private completedCheckpointMapper: IMapper<
      CompletedCheckpoint,
      CompletedCheckpointDTO
    >,
  ) {}

  async get(
    args: GetCompletedCheckpointArgs,
  ): Promise<CompletedCheckpoint | null> {
    const existingCompletedCheckpoint =
      await this.completedCheckpointModel.findOne({
        checkpoint: new Types.ObjectId(args.checkpointId),
        path: new Types.ObjectId(args.pathId),
        student: new Types.ObjectId(args.studentId),
      })

    return existingCompletedCheckpoint
      ? this.completedCheckpointMapper.toDomain(existingCompletedCheckpoint)
      : null
  }

  async list(
    args: ListCompletedCheckpointArgs,
  ): Promise<Array<CompletedCheckpoint>> {
    let query = this.completedCheckpointModel.find()

    if (args.pathId)
      query = query.find({ path: new Types.ObjectId(args.pathId) })

    if (args.studentId)
      query = query.where({ student: new Types.ObjectId(args.studentId) })

    if (args.checkpointId)
      query = query.where({ checkpoint: new Types.ObjectId(args.checkpointId) })

    const completedCheckpoints = await query.exec()
    return completedCheckpoints.map(this.completedCheckpointMapper.toDomain)
  }

  async save(args: CompletedCheckpoint): Promise<void> {
    await this.completedCheckpointModel.findOneAndUpdate(
      {
        checkpoint: new Types.ObjectId(args.checkpoint),
        path: new Types.ObjectId(args.path),
        student: new Types.ObjectId(args.student),
      },
      this.completedCheckpointMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
