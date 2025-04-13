import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import {
  defaultQuestionDifficulty,
  defaultQuestionEstimatedTime,
  defaultQuestionScore,
  Events,
  Repos,
} from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { generateId } from "../../../utils/generate-id"
import { IQuizRepo } from "../../quiz/config/i-quiz.repo"
import { ISubQuizMetadataRepo } from "../../sub_quiz_metadata/config/i-sub-quiz-metadata.repo"
import { TSubQuiz } from "../../sub_quiz_metadata/config/sub-quiz-metadata.domain"
import { ISubQuizCreatedEvent } from "../../sub_quiz_metadata/sub_quiz_created/sub-quiz-created.events"
import { ChoiceQuestion } from "../config/choice-question.domain"
import { IChoiceQuestionRepo } from "../config/i-choice-question.repo"
import {
  CreateChoiceQuestionArgs,
  CreateChoiceQuestionResult,
  ICreateChoiceQuestionUseCase,
} from "./i-create-choice-question-use-case"

@Injectable()
export class CreateChoiceQuestionUseCase
  implements ICreateChoiceQuestionUseCase
{
  constructor(
    @Inject(Repos.quiz) private readonly quizRepo: IQuizRepo,
    @Inject(Repos.choiceQuestion)
    private readonly choiceQuestionRepo: IChoiceQuestionRepo,
    @Inject(Repos.subQuizMetadata)
    private readonly subQuizMetadataRepo: ISubQuizMetadataRepo,
    @Inject(Events.subQuizCreated)
    private readonly subQuizMetadataEvents: ISubQuizCreatedEvent,
  ) {}

  async execute(
    args: CreateChoiceQuestionArgs,
  ): Promise<CreateChoiceQuestionResult> {
    const exitingQuiz = await this.quizRepo.getById({ quizId: args.quizId })
    if (!exitingQuiz)
      return Left.create({
        code: "quiz_not_found",
        message: "quiz not found",
        status: HttpStatus.NOT_FOUND,
      })

    const createdAt = new Date()
    const questionId = generateId()

    await this.subQuizMetadataRepo.save({
      createdAt,
      deletedAt: undefined,
      difficulty: defaultQuestionDifficulty,
      estimatedTime: defaultQuestionEstimatedTime,
      question: questionId,
      questionType: TSubQuiz.choiceQuestion,
      quiz: args.quizId,
      score: args.score || defaultQuestionScore,
      updatedAt: createdAt,
    })

    const choiceQuestion = {
      choiceQuestionId: questionId,
      correctAnswerFeedback: [
        { content: args.correctAnswerFeedback, language: args.defaultLanguage },
      ],
      correctOptions: args.correctOptions,
      createdAt,
      defaultLanguage: args.defaultLanguage,
      deletedAt: undefined,
      difficulty: args.difficulty,
      estimatedTime: args.estimatedTime,
      headline: [{ content: args.headline, language: args.defaultLanguage }],
      hints: args.hints.map((hint) => ({
        details: [{ content: hint.details, language: args.defaultLanguage }],
        requiredScore: hint.requiredScore,
      })),
      metaTags: args.metaTags.map((metaTag) => [
        { content: metaTag, language: args.defaultLanguage },
      ]),
      options: args.options.map((option) => [
        { content: option, language: args.defaultLanguage },
      ]),
      score: args.score || defaultQuestionScore,
      updatedAt: createdAt,
      wrongAnswerFeedback: [
        { content: args.wrongAnswerFeedback, language: args.defaultLanguage },
      ],
    } satisfies ChoiceQuestion

    await this.choiceQuestionRepo.save(choiceQuestion)

    await this.subQuizMetadataEvents.newSubQuizCreated({
      questionId: choiceQuestion.choiceQuestionId,
      quizId: args.quizId,
    })

    return Right.create({
      isSuccess: true,
      message: " choice question created successfully",
      payload: { questionId },
    })
  }
}
