import { Type } from "class-transformer"
import {
    IsBoolean,
  IsDefined,
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


export class CreateTrueFalseQuestionArgs {
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

   @IsBoolean()
  @IsDefined({ message: "ideal option is required" })
  idealOption: boolean;

  @IsInt()
  @IsOptional()
  score: number

  @IsNotEmpty({ message: "wrong answer feedback is required" })
  @IsString()
  wrongAnswerFeedback: string
}