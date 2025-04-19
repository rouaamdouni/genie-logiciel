import { HttpStatus, Inject, Injectable } from "@nestjs/common"

import { Repos } from "../../../utils/constants"
import { Left, Right } from "../../../utils/either"
import { ICompletedNodeRepo } from "../../completed_node/config/i-completed-node.repo"
import { IEnrolledPathRepo } from "../../enrolled_path/config/i-enrolled-path.repo"
import { TEntity } from "../../graph/config/graph.domain"
import { IPathRepo } from "../../path/config/i-path.repo"
import { IPathItemRepo } from "../../path_item/config/i-path-item.repo"
import { IQuizRepo } from "../../quiz/config/i-quiz.repo"
import { ICompletedQuizRepo } from "../config/i-completed-quiz.repo"
import {
  IStartQuizUseCase,
  StartQuizArgs,
  StartQuizResult,
} from "./i-start-quiz-use-case"

@Injectable()
export class StartQuizUseCase implements IStartQuizUseCase {
  constructor(
    @Inject(Repos.enrolledPath)
    private readonly enrolledPathRepo: IEnrolledPathRepo,
    @Inject(Repos.completedQuiz)
    private readonly completedQuizRepo: ICompletedQuizRepo,
    @Inject(Repos.completedNode)
    private readonly completedNodeRepo: ICompletedNodeRepo,
    @Inject(Repos.path) private readonly pathRepo: IPathRepo,
    @Inject(Repos.pathItem) private readonly pathItemRepo: IPathItemRepo,
    @Inject(Repos.quiz) private readonly quizRepo: IQuizRepo,
  ) {}

  async execute(args: StartQuizArgs): Promise<StartQuizResult> {
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
        message: "student not enrolled in path",
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
        message: "this quiz is not part of the path",
        status: HttpStatus.BAD_REQUEST,
      })

    const existingCompletedTargetNode = await this.completedNodeRepo.get(
      args.studentId,
      args.pathId,
      args.quizId,
    )

    if (existingCompletedTargetNode)
      return Left.create({
        code: "path_item_completed",
        message: "this quiz is already completed",
        status: HttpStatus.CONFLICT,
      })

    if (existingPathItem.prevItem) {
      const existingPreviousPathItem = await this.pathItemRepo.getById(
        existingPathItem.prevItem,
      )

      if (existingPreviousPathItem) {
        const existingCompletedPreviousNode = await this.completedNodeRepo.get(
          args.studentId,
          args.pathId,
          existingPreviousPathItem.entityId,
        )

        if (
          !existingCompletedPreviousNode ||
          !existingCompletedPreviousNode.isCompleted
        )
          return Left.create({
            code: "previous_item_not_completed",
            message: "previous item not completed",
            status: HttpStatus.BAD_REQUEST,
          })
      }
    }

    const completedNodeCreatedAt = new Date()
    await this.completedNodeRepo.save({
      createdAt: completedNodeCreatedAt,
      entityId: args.quizId,
      entityType: TEntity.quizzes,
      isCompleted: false,
      pathId: args.pathId,
      score: 0,
      studentId: args.studentId,
      updatedAt: completedNodeCreatedAt,
    })

    const completedQuizCreatedAt = new Date()
    await this.completedQuizRepo.save({
      completedSubQuizzes: 0,
      createdAt: completedQuizCreatedAt,
      isCompleted: false,
      pathId: args.pathId,
      quizId: args.quizId,
      score: 0,
      studentId: args.studentId,
      updatedAt: completedQuizCreatedAt,
    })

    await this.enrolledPathRepo.save({
      ...existingEnrolledPath,
      progressPointer: existingPathItem.pathItemId,
      updatedAt: new Date(),
    })

    return Right.create({
      isSuccess: true,
      message: "Quiz started successfully",
      payload: {
        pathId: args.pathId,
        quizId: args.quizId,
        studentId: args.studentId,
      },
    })
  }
}
