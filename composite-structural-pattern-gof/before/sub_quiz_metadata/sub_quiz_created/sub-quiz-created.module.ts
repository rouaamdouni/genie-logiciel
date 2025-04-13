import { BullModule } from "@nestjs/bull"
import { Module } from "@nestjs/common"

import { Events, Queues } from "../../../utils/constants"
import { QuizModule } from "../../quiz/quiz.module"
import { SubQuizMetadataModule } from "../sub-quiz-metadata.module"
import { SubQuizCreatedConsumer } from "./sub-quiz-created.consumer"
import { SubQuizCreatedEvent } from "./sub-quiz-created.events"

const subQuizCreatedQueue = BullModule.registerQueue({
  name: Queues.subQuizCreated,
})

@Module({
  exports: [{ provide: Events.subQuizCreated, useClass: SubQuizCreatedEvent }],
  imports: [subQuizCreatedQueue, QuizModule, SubQuizMetadataModule],
  providers: [
    { provide: Events.subQuizCreated, useClass: SubQuizCreatedEvent },
    { provide: Queues.subQuizCreated, useClass: SubQuizCreatedConsumer },
  ],
})
export class SubQuizCreatedModule {}
