import { Module } from "@nestjs/common"
import { MongooseModule } from "@nestjs/mongoose"
import { Mappers, Models, Repos } from "src/utils/constants"

import { SubQuizSchema } from "../../../database/mongo/models/sub-quiz"
import { SubQuizMetadataMapper } from "./config/sub-quiz-metadata.mapper"
import { SubQuizMetadataRepo } from "./config/sub-quiz-metadata.repo"

const subQuizModel = MongooseModule.forFeature([
  { name: Models.subQuizzes, schema: SubQuizSchema },
])

@Module({
  exports: [
    { provide: Repos.subQuizMetadata, useClass: SubQuizMetadataRepo },
    { provide: Mappers.subQuizMetadata, useClass: SubQuizMetadataMapper },
  ],
  imports: [subQuizModel],
  providers: [
    { provide: Repos.subQuizMetadata, useClass: SubQuizMetadataRepo },
    { provide: Mappers.subQuizMetadata, useClass: SubQuizMetadataMapper },
  ],
})
export class SubQuizMetadataModule {}
