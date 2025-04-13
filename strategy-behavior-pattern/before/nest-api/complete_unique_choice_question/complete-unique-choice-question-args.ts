import { IsInt, IsNotEmpty } from "class-validator"

export class CompleteUniqueChoiceQuestionArgs {
  @IsNotEmpty({ message: "student response is required" })
  @IsInt()
  studentResponse: number
}
