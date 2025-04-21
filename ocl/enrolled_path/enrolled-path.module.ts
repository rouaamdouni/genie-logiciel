import { Module } from "@nestjs/common/decorators/modules"
import { MongooseModule } from "@nestjs/mongoose"
import { Mappers, Models, Repos } from "src/utils/constants"

import { EnrolledPathSchema } from "../../../database/mongo/models/enrolled-path"
import { EnrolledPathMapper } from "./config/enrolled-path.mapper"
import { EnrolledPathRepo } from "./config/enrolled-path.repo"

const enrolledPathModel = MongooseModule.forFeature([
  { name: Models.enrolledPaths, schema: EnrolledPathSchema },
])

@Module({
  exports: [
    { provide: Mappers.enrolledPath, useClass: EnrolledPathMapper },
    { provide: Repos.enrolledPath, useClass: EnrolledPathRepo },
  ],
  imports: [enrolledPathModel],
  providers: [
    { provide: Mappers.enrolledPath, useClass: EnrolledPathMapper },
    { provide: Repos.enrolledPath, useClass: EnrolledPathRepo },
  ],
})
export class EnrolledPathModule {}
