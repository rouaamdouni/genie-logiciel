import { IsNotEmpty, IsNumber, IsUrl } from "class-validator"

export class RateCheckpointArgs {
  @IsNotEmpty({ message: "feedback document url is required" })
  @IsUrl()
  feedbackDocumentURL: string

  @IsNotEmpty({ message: "rate is required" })
  @IsNumber()
  rate: number
}
