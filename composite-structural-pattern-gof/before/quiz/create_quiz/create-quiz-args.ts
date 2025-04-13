import { Type } from "class-transformer"
import { IsNotEmpty, IsString } from "class-validator"
import { PositionValidator } from "src/common/position.validator"
import { Position } from "src/utils/types"

export class CreateQuizArgs {
  @IsNotEmpty({ message: "default language is required" })
  @IsString()
  defaultLanguage: string

  @IsNotEmpty({ message: "title is required" })
  @IsString()
  label: string

  @IsNotEmpty({ message: "meta tags are required" })
  @IsString({ each: true })
  metaTags: Array<string>

  @IsNotEmpty({ message: "position is required" })
  @Type(() => PositionValidator)
  position: Position

  @IsNotEmpty({ message: "slug is required" })
  @IsString()
  slug: string
}
