import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { CompletedSkillDocument } from "../../../../database/mongo/models/completed-skill"
import { CompletedSkill } from "./completed-skill.domain"
import { CompletedSkillDTO } from "./completed-skill.dto"
import {
  GetCompletedSkillArgs,
  ICompletedSkillRepo,
} from "./i-completed-skill.repo"

@Injectable()
export class CompletedSkillRepo implements ICompletedSkillRepo {
  constructor(
    @InjectModel(Models.completedSkills)
    private readonly completedSkillModel: Model<CompletedSkillDocument>,
    @Inject(Mappers.completedSkill)
    private readonly completedSkillMapper: IMapper<
      CompletedSkill,
      CompletedSkillDTO
    >,
  ) {}

  async get(args: GetCompletedSkillArgs): Promise<CompletedSkill | null> {
    const existingCompletedSkill = await this.completedSkillModel.findOne({
      path: new Types.ObjectId(args.pathId),
      skill: new Types.ObjectId(args.skillId),
      student: new Types.ObjectId(args.studentId),
    })

    return existingCompletedSkill
      ? this.completedSkillMapper.toDomain(existingCompletedSkill)
      : null
  }

  async save(args: CompletedSkill): Promise<void> {
    await this.completedSkillModel.findOneAndUpdate(
      {
        path: new Types.ObjectId(args.path),
        skill: new Types.ObjectId(args.skill),
        student: new Types.ObjectId(args.student),
      },
      this.completedSkillMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
