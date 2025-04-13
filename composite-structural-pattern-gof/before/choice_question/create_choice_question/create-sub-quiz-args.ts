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

class HintValidator {
  @IsNotEmpty({ message: "hint details are required" })
  @IsString()
  details: string

  @IsInt()
  @IsNotEmpty({ message: "required score is required" })
  requiredScore: number
}

export class CreateSubQuizArgs {
  @IsNotEmpty({ message: "correct answer feedback is required" })
  @IsString()
  correctAnswerFeedback: string

  @IsNotEmpty({ message: "ideal options is required" })
  @Type(() => Array<number>)
  correctOptions: Array<number>

  @IsNotEmpty({ message: "default language is required" })
  @IsString()
  defaultLanguage: string

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
  hints: Array<{
    details: string
    requiredScore: number
  }>

  @IsArray()
  @IsNotEmpty({ message: "meta tags required" })
  @IsString({ each: true })
  metaTags: Array<string>

  @IsArray()
  @IsNotEmpty({ message: "options are required" })
  @IsString({ each: true })
  options: Array<string>

  @IsInt()
  @IsOptional()
  score?: number

  @IsNotEmpty({ message: "wrong answer feedback is required" })
  @IsString()
  wrongAnswerFeedback: string
}
