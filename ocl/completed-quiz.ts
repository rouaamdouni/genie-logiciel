import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { Path } from "./path"
import { Quiz } from "./quiz"
import { User } from "./user"

export type CompletedQuizDocument = HydratedDocument<CompletedQuiz>

@Schema({ collection: "completedQuizzes", timestamps: true })
export class CompletedQuiz {
  @Prop({ default: 0, type: Number })
  completedSubQuizzes: number

  @Prop({ default: mongoose.now(), type: Date })
  createdAt: Date

  @Prop({ default: false, type: Boolean })
  isCompleted: boolean

  @Prop({ required: true, type: Number })
  passedTime: number

  @Prop({ ref: "paths", required: true, type: Types.ObjectId })
  path: Path

  @Prop({ ref: "quizzes", required: true, type: Types.ObjectId })
  quiz: Quiz

  @Prop({ default: 0, type: Number })
  score: number

  @Prop({ ref: "users", required: false, type: Types.ObjectId })
  student: User

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedQuizSchema = SchemaFactory.createForClass(CompletedQuiz)

export const CompletedQuizModel = mongoose.model(
  "completedQuizzes",
  CompletedQuizSchema,
)
