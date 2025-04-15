// quiz.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { questionStrategyMap } from './question-strategy.map';
import { QuestionEvaluationContext } from './context/question-context'
@Controller('quiz')
export class QuizController {
    constructor(private readonly evaluationContext: QuestionEvaluationContext) { }

    @Post(':id/evaluate')
    async evaluateQuestion(
        @Param('id') questionId: string,
        @Body() body: { studentResponse: any, correctAnswer: any, maxScore: number },
    ) {
        const { studentResponse, correctAnswer, maxScore } = body;

        // Get the strategy class from the map based on the question ID
        const StrategyClass = questionStrategyMap[questionId];
        if (!StrategyClass) {
            throw new Error('Strategy not found for this question type');
        }

        // Create an instance of the corresponding strategy
        const strategy = new StrategyClass();

        // Set the strategy in the context
        this.evaluationContext.setStrategy(strategy);

        // Evaluate the student response using the strategy
        const result = this.evaluationContext.evaluate(studentResponse, correctAnswer, maxScore);

        return result;
    }
}
