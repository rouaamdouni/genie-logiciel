import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { Checkpoint } from "./checkpoint"
import { Path } from "./path"
import { Quiz } from "./quiz"
import { Reward } from "./reward"
import { Skill } from "./skill"
import { SuperSkill } from "./super-skill"
import { User } from "./user"

export type CompletedNodeDocument = HydratedDocument<CompletedNode>

@Schema({ collection: "completedNodes", timestamps: true })
export class CompletedNode {
  @Prop({ default: mongoose.now(), type: Date })
  createdAt: Date

  @Prop({ refPath: "entityType", required: true, type: Types.ObjectId })
  entity: Checkpoint | Quiz | Reward | Skill | SuperSkill

  @Prop({
    enum: ["skills", "quizzes", "superSkills", "checkpoints", "rewards"],
    required: true,
    type: String,
  })
  entityType: string

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

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedNodeSchema = SchemaFactory.createForClass(CompletedNode)

export const CompletedNodeModel = mongoose.model(
  "completedNodes",
  CompletedNodeSchema,
)
