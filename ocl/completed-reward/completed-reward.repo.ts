import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { CompletedRewardDocument } from "../../../../database/mongo/models/completed-reward"
import { CompletedReward } from "./completed-reward.domain"
import { CompletedRewardDTO } from "./completed-reward.dto"
import {
  GetCompletedRewardArgs,
  ICompletedRewardRepo,
  ListCompletedRewardArgs,
} from "./i-completed-reward.repo"

@Injectable()
export class CompletedRewardRepo implements ICompletedRewardRepo {
  constructor(
    @InjectModel(Models.completedRewards)
    private completedRewardModel: Model<CompletedRewardDocument>,
    @Inject(Mappers.completedReward)
    private completedRewardMapper: IMapper<CompletedReward, CompletedRewardDTO>,
  ) {}

  async get(args: GetCompletedRewardArgs): Promise<CompletedReward | null> {
    const existingCompletedReward = await this.completedRewardModel.findOne({
      path: new Types.ObjectId(args.pathId),
      reward: new Types.ObjectId(args.rewardId),
      student: new Types.ObjectId(args.studentId),
    })

    return existingCompletedReward
      ? this.completedRewardMapper.toDomain(existingCompletedReward)
      : null
  }

  async list(args: ListCompletedRewardArgs): Promise<Array<CompletedReward>> {
    let query = this.completedRewardModel.find()

    if (args.pathId)
      query = query.find({ path: new Types.ObjectId(args.pathId) })

    if (args.studentId)
      query = query.where({ student: new Types.ObjectId(args.studentId) })

    if (args.rewardId)
      query = query.where({ reward: new Types.ObjectId(args.rewardId) })

    const completedRewards = await query.exec()
    return completedRewards.map(this.completedRewardMapper.toDomain)
  }

  async save(args: CompletedReward): Promise<void> {
    await this.completedRewardModel.findOneAndUpdate(
      {
        path: new Types.ObjectId(args.path),
        reward: new Types.ObjectId(args.reward),
        student: new Types.ObjectId(args.student),
      },
      this.completedRewardMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
