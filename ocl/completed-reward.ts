import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { Path } from "./path"
import { Reward } from "./reward"
import { User } from "./user"

export type CompletedRewardDocument = HydratedDocument<CompletedReward>

@Schema({ collection: "completedRewards", timestamps: true })
export class CompletedReward {
  @Prop({ default: mongoose.now(), type: Date })
  createdAt: Date

  @Prop({ required: false, type: String })
  feedbackDocumentURL?: string

  @Prop({ default: false, type: Boolean })
  isCompleted: boolean

  @Prop({ default: false, type: Boolean })
  isRated: boolean

  @Prop({ required: true, type: Number })
  passedTime: number

  @Prop({ ref: "paths", required: true, type: Types.ObjectId })
  path: Path

  @Prop({ enum: ["file", "link"], required: false, type: String })
  projectType?: string

  @Prop({ ref: "rewards", required: true, type: Types.ObjectId })
  reward: Reward

  @Prop({ default: 0, type: Number })
  score: number

  @Prop({ ref: "users", required: false, type: Types.ObjectId })
  student: User

  @Prop({ required: false, type: String })
  studentProjectURL?: string

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedRewardSchema =
  SchemaFactory.createForClass(CompletedReward)

export const CompletedRewardModel = mongoose.model(
  "completedRewards",
  CompletedRewardSchema,
)
