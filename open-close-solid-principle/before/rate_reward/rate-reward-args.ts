import { IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator"

export class RateRewardArgs {
  @IsNotEmpty({ message: "feedback document url is required" })
  @IsString()
  @IsUrl()
  feedbackDocumentURL: string

  @IsNotEmpty({ message: "rate is required" })
  @IsNumber()
  rate: number
}
