import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose, { HydratedDocument, Types } from "mongoose"

import { ChoiceQuestion } from "./choice-question"
import { Path } from "./path"
import { Quiz } from "./quiz"
import { User } from "./user"

export type CompletedSubQuizDocument = HydratedDocument<CompletedSubQuiz>

@Schema({ collection: "completedSubQuizzes", timestamps: true })
export class CompletedSubQuiz {
  @Prop({ default: mongoose.now(), type: Date })
  createdAt: Date

  @Prop({ required: true, type: Number })
  passedTime: number

  @Prop({ ref: "paths", required: true, type: Types.ObjectId })
  path: Path

  @Prop({ refPath: "questionType", required: true, type: Types.ObjectId })
  question: ChoiceQuestion

  @Prop({
    enum: ["choiceQuestions"],
    required: true,
    type: String,
  })
  questionType: string

  @Prop({ ref: "quizzes", required: true, type: Types.ObjectId })
  quiz: Quiz

  @Prop({ required: true, type: Number })
  score: number

  @Prop({ enum: ["correct", "wrong", "skipped"], required: true })
  status: "correct" | "pending" | "skipped" | "wrong"

  @Prop({ ref: "users", required: false, type: Types.ObjectId })
  student: User

  @Prop([{ required: true, type: Number }])
  takenHints: Array<number>

  @Prop({ default: mongoose.now(), type: Date })
  updatedAt: Date
}

export const CompletedSubQuizSchema =
  SchemaFactory.createForClass(CompletedSubQuiz)

export const CompletedSubQuizModel = mongoose.model(
  "completedSubQuizzes",
  CompletedSubQuizSchema,
)
