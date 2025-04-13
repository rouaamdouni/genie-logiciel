import { Process, Processor } from "@nestjs/bull"
import { Inject } from "@nestjs/common"
import { Job } from "bull"
import { Jobs, Queues, Repos } from "src/utils/constants"

import { IQuizRepo } from "../../quiz/config/i-quiz.repo"
import { ISubQuizMetadataRepo } from "../config/i-sub-quiz-metadata.repo"
import { NewSubQuizCreatedArgs } from "./sub-quiz-created.events"

@Processor(Queues.subQuizCreated)
export class SubQuizCreatedConsumer {
  constructor(
    @Inject(Repos.subQuizMetadata)
    private readonly subQuizMetadataRepo: ISubQuizMetadataRepo,
    @Inject(Repos.quiz) private readonly quizRepo: IQuizRepo,
  ) {}
  @Process(Jobs.newSubQuizCreated)
  async newSubQuizMetadata({ data }: Job<NewSubQuizCreatedArgs>) {
    const existingQuiz = await this.quizRepo.getById({ quizId: data.quizId })
    if (!existingQuiz) return

    const subQuizzesMetadata = await this.subQuizMetadataRepo.list(data.quizId)

    const totalQuizScore = subQuizzesMetadata.reduce(
      (prev, curr) => prev + curr.score,
      0,
    )

    await this.quizRepo.save({
      ...existingQuiz,
      questionsCount: subQuizzesMetadata.length,
      score: totalQuizScore,
      updatedAt: new Date(),
    })
  }
}
