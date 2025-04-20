import { Injectable } from "@nestjs/common";
import { BaseCreateEntityUseCase } from "../base-create-entity.use-case";
import { Quiz } from "../quiz/quiz.domain";
import { CreateQuizArgs, CreateQuizResult } from "../quiz/i-create-quiz-use-case";
import { TEntity } from "../utils/entity";

@Injectable()
export class CreateQuizUseCase extends BaseCreateEntityUseCase<
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

  protected buildEntity(args: CreateQuizArgs, quizId: string, createdAt: Date): Quiz {
    return new Quiz(
      quizId,
      args.slug,
      [{ content: args.label, language: args.defaultLanguage }],
      args.metaTags.map(tag => [{ content: tag, language: args.defaultLanguage }]),
      0, // questionsCount par défaut
      0, // totalTime par défaut
      args.defaultLanguage,
    );
  }
}