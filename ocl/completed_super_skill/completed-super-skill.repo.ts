import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { CompletedSuperSkillDocument } from "../../../../database/mongo/models/completed-super-skill"
import { CompletedSuperSkill } from "./completed-super-skill.domain"
import { CompletedSuperSkillDTO } from "./completed-super-skill.dto"
import {
  GetCompletedSuperSkillArgs,
  ICompletedSuperSkillRepo,
} from "./i-completed-super-skill.repo"

@Injectable()
export class CompletedSuperSkillRepo implements ICompletedSuperSkillRepo {
  constructor(
    @InjectModel(Models.completedSuperSkills)
    private readonly completedSuperSkillModel: Model<CompletedSuperSkillDocument>,
    @Inject(Mappers.completedSuperSkill)
    private readonly completedSuperSkillMapper: IMapper<
      CompletedSuperSkill,
      CompletedSuperSkillDTO
    >,
  ) {}

  async get(
    args: GetCompletedSuperSkillArgs,
  ): Promise<CompletedSuperSkill | null> {
    const existingCompletedSuperSkill =
      await this.completedSuperSkillModel.findOne({
        path: new Types.ObjectId(args.pathId),
        student: new Types.ObjectId(args.studentId),
        superSkill: new Types.ObjectId(args.superSkillId),
      })

    return existingCompletedSuperSkill
      ? this.completedSuperSkillMapper.toDomain(existingCompletedSuperSkill)
      : null
  }

  async save(args: CompletedSuperSkill): Promise<void> {
    await this.completedSuperSkillModel.findOneAndUpdate(
      {
        path: new Types.ObjectId(args.path),
        student: new Types.ObjectId(args.student),
        superSkill: new Types.ObjectId(args.superSkill),
      },
      this.completedSuperSkillMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
