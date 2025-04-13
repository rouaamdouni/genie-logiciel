import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Events, Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { ICompletedQuizRepo } from "../../completed_quiz/config/i-completed-quiz.repo"
import { ICompletedSubQuizRepo } from "../../completed_sub_quiz/config/i-completed-sub-quiz.repo"
import { ISubQuizCompletedEvent } from "../../completed_sub_quiz/sub_quiz_completed/sub-quiz-completed.event"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { IPathRepo } from "../../path/config/i-path.repo"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { IQuizRepo } from "../../quiz/config/i-quiz.repo"
import { ISubQuizMetadataRepo } from "../../sub_quiz_metadata/config/i-sub-quiz-metadata.repo"
import { TSubQuiz } from "../../sub_quiz_metadata/config/sub-quiz-metadata.domain"
import { IUniqueChoiceQuestionRepo } from "../../unique_choice_question/config/i-unique-choice-question.repo"
import { ICompletedUniqueChoiceQuestionRepo } from "../config/i-completed-unique-choice-question.repo"
import {
  CompleteUniqueChoiceQuestionArgs,
  CompleteUniqueChoiceQuestionResult,
  ICompleteUniqueChoiceQuestionUseCase,
} from "./i-complete-unique-choice-question-use-case"

@Injectable()
export class CompleteUniqueChoiceQuestionUseCase
  implements ICompleteUniqueChoiceQuestionUseCase
{
  constructor(
    @Inject(Repos.completedUniqueChoiceQuestion)
    private readonly completedUniqueChoiceQuestionRepo: ICompletedUniqueChoiceQuestionRepo,
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.quiz) private readonly quizRepo: IQuizRepo,
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.uniqueChoiceQuestion)
    private readonly uniqueChoiceQuestionRepo: IUniqueChoiceQuestionRepo,
    @Inject(Repos.subQuizMetadata)
    private readonly subQuizMetadataRepo: ISubQuizMetadataRepo,
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedQuiz)
    private readonly completedQuizRepo: ICompletedQuizRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Repos.completedSubQuiz)
    private readonly completedSubQuizRepo: ICompletedSubQuizRepo,
    @Inject(Events.completedSubQuiz)
    private readonly subQuizCompletedEvent: ISubQuizCompletedEvent,
  ) {}

  async execute(
    args: CompleteUniqueChoiceQuestionArgs,
  ): Promise<CompleteUniqueChoiceQuestionResult> {
    const existingPath = await this.pathRepo.getById(args.pathId)
    if (!existingPath)
      return Left.create({
        code: "path_not_found",
        message: "path not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingEnrolledPath = await this.enrolledPathRepo.get(
      args.pathId,
      args.studentId,
    )

    if (!existingEnrolledPath)
      return Left.create({
        code: "path_not_enrolled",
        message: "path not enrolled",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingQuiz = await this.quizRepo.getById(args.quizId)
    if (!existingQuiz)
      return Left.create({
        code: "quiz_not_found",
        message: "quiz not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingPathItem = await this.pathItemRepo.get(
      args.pathId,
      args.quizId,
    )
    if (!existingPathItem)
      return Left.create({
        code: "entity_not_in_path",
        message: "quiz not path item",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedNode = await this.completedNodeRepo.get(
      args.studentId,
      args.pathId,
      args.quizId,
    )

    if (!existingCompletedNode)
      return Left.create({
        code: "quiz_not_started",
        message: "quiz not started",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedQuiz = await this.completedQuizRepo.get({
      pathId: args.pathId,
      quizId: args.quizId,
      studentId: args.studentId,
    })

    if (!existingCompletedQuiz)
      return Left.create({
        code: "quiz_not_started",
        message: "quiz not started",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingSubQuiz = await this.uniqueChoiceQuestionRepo.get(
      args.questionId,
    )

    if (!existingSubQuiz)
      return Left.create({
        code: "sub_quiz_not_found",
        message: "sub quiz not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingSubQuizMetadata = await this.subQuizMetadataRepo.get(
      args.quizId,
      args.questionId,
    )

    if (!existingSubQuizMetadata)
      return Left.create({
        code: "sub_quiz_not_found",
        message: "sub quiz not found",
        status: HttpStatus.NOT_FOUND,
      })

    const existingCompletedSubQuiz =
      await this.completedUniqueChoiceQuestionRepo.get({
        pathId: args.pathId,
        questionId: args.questionId,
        quizId: args.quizId,
        studentId: args.studentId,
      })

    if (existingCompletedSubQuiz)
      return Left.create({
        code: "sub_quiz_already_started",
        message: "you already started this sub quiz",
        status: HttpStatus.CONFLICT,
      })

    const isTheRightAnswer =
      args.studentResponse === existingSubQuiz.idealOption

    const reward = isTheRightAnswer ? existingSubQuizMetadata.score : 0

    const completedSubQuizCreatedAt = new Date()
    await this.completedSubQuizRepo.save({
      createdAt: completedSubQuizCreatedAt,
      pathId: args.pathId,
      questionId: existingSubQuiz.questionId,
      quizId: args.quizId,
      score: reward,
      studentId: args.studentId,
      subQuizType: TSubQuiz.uniqueChoiceQuestion,
      updatedAt: completedSubQuizCreatedAt,
    })

    const createdAt = new Date()
    await this.completedUniqueChoiceQuestionRepo.save({
      createdAt,
      pathId: args.pathId,
      questionId: existingSubQuiz.questionId,
      quizId: args.quizId,
      score: reward,
      studentId: args.studentId,
      studentResponse: args.studentResponse,
      updatedAt: createdAt,
    })

    await this.subQuizCompletedEvent.newCompletedSubQuiz(args)

    return Right.create(
      isTheRightAnswer
        ? { isValidResponse: true }
        : {
            expectedResponse: existingSubQuiz.idealOption,
            isValidResponse: false,
            studentResponse: args.studentResponse,
          },
    )
  }
}
