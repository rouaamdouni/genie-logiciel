// src/questions/question.controller.ts
import {
    Controller,
    Post,
    Body,
    BadRequestException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { StrategyRegistry } from './strategy-registy-service';
import { QuestionEvaluationContext } from './context/question-context';
import { EvaluateQuestionDto } from '../dto/evaluate-question.dto';

@Controller('questions')
export class QuestionController {
    constructor(
        private readonly registry: StrategyRegistry,
        private readonly context: QuestionEvaluationContext
    ) { }

    @Post('evaluate')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    evaluateQuestion(@Body() body: EvaluateQuestionDto) {
        const { type, studentAnswer, correctAnswer, maxScore } = body;

        try {
            const strategy = this.registry.getStrategy(type);
            this.context.setStrategy(strategy);
            return this.context.evaluate(studentAnswer, correctAnswer, maxScore);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
