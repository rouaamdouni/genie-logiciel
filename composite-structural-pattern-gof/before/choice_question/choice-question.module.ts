import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Mappers, Models, Repos } from "src/utils/constants"

import { ChoiceQuestionSchema } from "../../../database/mongo/models/choice-question"
import { ChoiceQuestionMapper } from "./config/choice-question.mapper"
import { ChoiceQuestionRepo } from "./config/choice-question.repo"

const choiceQuestionModel = MongooseModule.forFeature([
  { name: Models.choiceQuestions, schema: ChoiceQuestionSchema },
])

@Module({
  exports: [
    {
      provide: Repos.choiceQuestion,
      useClass: ChoiceQuestionRepo,
    },
    {
      provide: Mappers.choiceQuestion,
      useClass: ChoiceQuestionMapper,
    },
  ],
  imports: [choiceQuestionModel],
  providers: [
    {
      provide: Mappers.choiceQuestion,
      useClass: ChoiceQuestionMapper,
    },
    {
      provide: Repos.choiceQuestion,
      useClass: ChoiceQuestionRepo,
    },
  ],
})
export class ChoiceQuestionModule {}
