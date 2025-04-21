import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { CompletedSubQuizDocument } from "../../../../database/mongo/models/completed-sub-quiz"
import { CompletedSubQuiz } from "./completed-sub-quiz.domain"
import { CompletedSubQuizDTO } from "./completed-sub-quiz.dto"
import {
  GetCompletedSubQuizArgs,
  ICompletedSubQuizRepo,
  ListCompletedSubQuizzesArgs,
} from "./i-completed-sub-quiz.repo"

@Injectable()
export class CompletedSubQuizRepo implements ICompletedSubQuizRepo {
  constructor(
    @InjectModel(Models.completedSubQuizzes)
    private readonly completedSubQuizModel: Model<CompletedSubQuizDocument>,
    @Inject(Mappers.completedSubQuiz)
    private readonly completedSubQuizMapper: IMapper<
      CompletedSubQuiz,
      CompletedSubQuizDTO
    >,
  ) {}

  async get(args: GetCompletedSubQuizArgs): Promise<CompletedSubQuiz | null> {
    const completedSubQuiz = await this.completedSubQuizModel.findOne({
      path: new Types.ObjectId(args.pathId),
      question: new Types.ObjectId(args.questionId),
      quiz: new Types.ObjectId(args.quizId),
      student: new Types.ObjectId(args.studentId),
    })

    return completedSubQuiz
      ? this.completedSubQuizMapper.toDomain(completedSubQuiz)
      : null
  }

  async list(
    args: ListCompletedSubQuizzesArgs,
  ): Promise<Array<CompletedSubQuiz>> {
    const completedSubQuizzes = await this.completedSubQuizModel.find({
      path: new Types.ObjectId(args.pathId),
      quiz: new Types.ObjectId(args.quizId),
      student: new Types.ObjectId(args.studentId),
    })

    return completedSubQuizzes.map(this.completedSubQuizMapper.toDomain)
  }

  async save(args: CompletedSubQuiz): Promise<void> {
    await this.completedSubQuizModel.findOneAndUpdate(
      {
        path: new Types.ObjectId(args.path),
        question: new Types.ObjectId(args.question),
        quiz: new Types.ObjectId(args.quiz),
        student: new Types.ObjectId(args.student),
      },
      this.completedSubQuizMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
