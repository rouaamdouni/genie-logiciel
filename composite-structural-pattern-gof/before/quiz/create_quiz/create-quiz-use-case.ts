import { Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Right } from "../../../utils/either"
import { generateId } from "../../../utils/generate-id"
import { TEntity } from "../../graph/config/graph.domain"
import { IEntityCreatedEvent } from "../../graph/entity_created/entity-created.event"
import { IQuizRepo } from "../config/i-quiz.repo"
import { Quiz } from "../config/quiz.domain"
import {
  CreateQuizArgs,
  CreateQuizResult,
  ICreateQuizUseCase,
} from "./i-create-quiz-use-case"

@Injectable()
export class CreateQuizUseCase implements ICreateQuizUseCase {
  constructor(
    @Inject(Events.entityCreated)
    private readonly entityCreatedEvent: IEntityCreatedEvent,
    @Inject(Repos.quiz) private readonly quizRepo: IQuizRepo,
  ) {}

  async execute(args: CreateQuizArgs): Promise<CreateQuizResult> {
    const createdAt = new Date()
    const quizId = generateId()

    const newQuiz = {
      createdAt,
      defaultLanguage: args.defaultLanguage,
      deletedAt: undefined,
      difficulty: 0,
      label: [{ content: args.label, language: args.defaultLanguage }],
      metaTags: args.metaTags.map((metaTag) => [
        { content: metaTag, language: args.defaultLanguage },
      ]),
      questionsCount: 0,
      quizId,
      score: 0,
      slug: args.slug,
      totalTime: 0,
      updatedAt: createdAt,
    } satisfies Quiz

    await this.quizRepo.save(newQuiz)

    await this.entityCreatedEvent.newCreatedEntity({
      entityId: quizId,
      entityType: TEntity.quizzes,
      position: args.position,
    })

    return Right.create({
      isSuccess: true,
      message: "Quiz created successfully",
      payload: { quizId },
    })
  }
}
