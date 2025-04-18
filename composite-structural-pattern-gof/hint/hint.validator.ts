import {
  IsInt,
  IsNotEmpty,
  IsString,
} from "class-validator"
export class HintValidator {
  @IsNotEmpty({ message: "hint details are required" })
  @IsString()
  details: string

  @IsInt()
  @IsNotEmpty({ message: "required score is required" })
  requiredScore: number
}