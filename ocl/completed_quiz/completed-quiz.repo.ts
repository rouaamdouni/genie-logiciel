import { Inject, Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model, Types } from "mongoose"
import { IMapper } from "src/common/mapper"
import { Mappers, Models } from "src/utils/constants"

import { CompletedQuizDocument } from "../../../../database/mongo/models/completed-quiz"
import { CompletedQuiz } from "./completed-quiz.domain"
import { CompletedQuizDTO } from "./completed-quiz.dto"
import {
  GetCompletedQuizArgs,
  ICompletedQuizRepo,
} from "./i-completed-quiz.repo"

@Injectable()
export class CompletedQuizRepo implements ICompletedQuizRepo {
  constructor(
    @Inject(Mappers.completedQuiz)
    private readonly completedQuizMapper: IMapper<
      CompletedQuiz,
      CompletedQuizDTO
    >,
    @InjectModel(Models.completedQuizzes)
    private readonly completedQuizModel: Model<CompletedQuizDocument>,
  ) {}

  async get(args: GetCompletedQuizArgs): Promise<CompletedQuiz | null> {
    const existingCompletedQuiz = await this.completedQuizModel.findOne({
      path: new Types.ObjectId(args.pathId),
      quiz: new Types.ObjectId(args.quizId),
      student: new Types.ObjectId(args.studentId),
    })

    return existingCompletedQuiz
      ? this.completedQuizMapper.toDomain(existingCompletedQuiz)
      : null
  }

  async save(args: CompletedQuiz): Promise<void> {
    await this.completedQuizModel.findOneAndUpdate(
      {
        path: new Types.ObjectId(args.path),
        quiz: new Types.ObjectId(args.quiz),
        student: new Types.ObjectId(args.student),
      },
      this.completedQuizMapper.toPersistence(args),
      { new: true, upsert: true },
    )
  }
}
