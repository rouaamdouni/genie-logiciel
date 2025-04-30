// src/questions/dto/evaluate-question.dto.ts
import { IsString, IsNumber, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class EvaluateQuestionDto<T = any> {
    @IsString()
    type: string;

    @IsDefined()
    studentAnswer: T;

    @IsDefined()
    correctAnswer: T;

    @IsNumber()
    maxScore: number;
}
