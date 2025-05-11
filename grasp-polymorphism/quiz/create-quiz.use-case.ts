import { Injectable } from "@nestjs/common";
import { BaseCreateEntity } from "../base-create-entity.use-case";
import { Quiz } from "../quiz/quiz.domain";
import { CreateQuizArgs, CreateQuizResult } from "../quiz/i-create-quiz-use-case";
import { TEntity } from "../utils/entity";
import { EntityFactory } from "../entity-factory";

@Injectable()
export class CreateQuizUseCase extends BaseCreateEntity<
  Quiz,
  CreateQuizArgs,
  CreateQuizResult
> {
  protected getEntityType(): TEntity {
    return "quizzes"; // Correction du type d'entité
  }

  protected getSuccessMessage(): string {
    return "Quiz created successfully"; // Correction du message
  }

  protected buildEntity(args: CreateQuizArgs, id: string): Quiz {
       return EntityFactory.create(this.getEntityType(), id, args);
   
  }
}