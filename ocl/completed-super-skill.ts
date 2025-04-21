import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { Path } from "./path"
import { SuperSkill } from "./super-skill"
import { User } from "./user"

export type CompletedSuperSkillDocument = HydratedDocument<CompletedSuperSkill>

@Schema({ collection: "completedSuperSkills", timestamps: true })
export class CompletedSuperSkill {
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

  @Prop({ ref: "users", required: false, type: Types.ObjectId })
  student: User

  @Prop({ ref: "superSkills", required: true, type: Types.ObjectId })
  superSkill: SuperSkill

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedSuperSkillSchema =
  SchemaFactory.createForClass(CompletedSuperSkill)

export const CompletedSuperSkillModel = mongoose.model(
  "completedSuperSkills",
  CompletedSuperSkillSchema,
)
