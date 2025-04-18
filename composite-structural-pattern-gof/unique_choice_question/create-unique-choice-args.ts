import { Type } from "class-transformer"
import {
    IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateNested,
} from "class-validator"
import { HintValidator } from "../hint/hint.validator"
import Hint from "../hint/Hint"


export class CreateUniqueChoiceQuestionArgs {
  @IsNotEmpty({ message: "correct answer feedback is required" })
  @IsString()
  correctAnswerFeedback: string

  @IsInt()
  @IsNotEmpty({ message: "difficulty is required" })
  @Max(3)
  @Min(1)
  difficulty: number

  @IsInt()
  @IsNotEmpty({ message: "estimated time is required" })
  estimatedTime: number

  @IsNotEmpty({ message: "headline is required" })
  @IsString()
  headline: string

  @IsNotEmpty({ message: "hints are required" })
  @Type(() => HintValidator)
  @ValidateNested({ each: true })
  hints: Array<Hint>

   @IsInt()
  @IsNotEmpty({ message: "ideal option is required" })
  idealOption: number;

  @IsArray()
  @IsNotEmpty({ message: "options are required" })
  @IsString({ each: true })
  options: Array<string>

  @IsInt()
  @IsOptional()
  score: number

  @IsNotEmpty({ message: "wrong answer feedback is required" })
  @IsString()
  wrongAnswerFeedback: string
}