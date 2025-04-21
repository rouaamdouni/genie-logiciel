import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { Path } from "./path"
import { Skill } from "./skill"
import { User } from "./user"

export type CompletedSkillDocument = HydratedDocument<CompletedSkill>

@Schema({ collection: "completedSkills", timestamps: true })
export class CompletedSkill {
  @Prop({ default: mongoose.now(), type: Date })
  createdAt: Date

  @Prop({ default: false, type: Boolean })
  isCompleted: boolean

  @Prop({ required: true, type: Number })
  passedTime: number

  @Prop({ ref: "paths", required: true, type: Types.ObjectId })
  path: Path

  @Prop({ default: 0, type: Number })
  score: number

  @Prop({ ref: "skills", required: true, type: Types.ObjectId })
  skill: Skill

  @Prop({ ref: "users", required: false, type: Types.ObjectId })
  student: User

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedSkillSchema = SchemaFactory.createForClass(CompletedSkill)

export const CompletedSkillModel = mongoose.model(
  "completedSkills",
  CompletedSkillSchema,
)
