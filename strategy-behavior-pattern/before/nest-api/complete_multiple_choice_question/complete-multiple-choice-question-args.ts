import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"

export class CompleteMultipleChoiceQuestionArgs {
  @IsNotEmpty({ message: "student response is required" })
  @Type(() => Array<number>)
  studentResponse: Array<number>
}
