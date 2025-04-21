import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { Checkpoint } from "./checkpoint"
import { Path } from "./path"
import { User } from "./user"

export type CompletedCheckpointDocument = HydratedDocument<CompletedCheckpoint>

@Schema({ collection: "completedCheckpoints", timestamps: true })
export class CompletedCheckpoint {
  @Prop({ ref: "checkpoints", required: true, type: Types.ObjectId })
  checkpoint: Checkpoint

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

  @Prop({ default: 0, type: Number })
  score: number

  @Prop({ ref: "users", required: false, type: Types.ObjectId })
  student: User

  @Prop({ required: false, type: String })
  studentProjectURL?: string

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedCheckpointSchema =
  SchemaFactory.createForClass(CompletedCheckpoint)

export const CompletedCheckpointModel = mongoose.model(
  "completedCheckpoints",
  CompletedCheckpointSchema,
)
