import { IsBoolean, IsInt, IsNotEmpty } from "class-validator"

export class CompleteTrueFalseQuestionArgs {
  @IsNotEmpty({ message: "student response is required" })
  @IsBoolean()
  studentResponse: boolean
}
