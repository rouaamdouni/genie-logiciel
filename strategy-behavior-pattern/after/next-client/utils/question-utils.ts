import { QuestionStrategies } from "@/strategies/question-strategies";
import { QuestionType } from "@/types/question-strategy";

export function getQuestionStrategy(questionType: QuestionType) {
    return QuestionStrategies[questionType];
}

export function validateQuestionInput<T>(
    questionType: QuestionType,
    data: unknown
) {
    const strategy = getQuestionStrategy(questionType);
    return strategy.schema.safeParse(data) as z.SafeParseReturnType<unknown, T>;
}