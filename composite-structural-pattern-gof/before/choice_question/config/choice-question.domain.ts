import { Hint } from "./Hint";
import { TextContent } from "./TextContent";

export class ChoiceQuestion {
  constructor(
    public readonly choiceQuestionId: string,
    public readonly headline: Array<TextContent>,
    public readonly options: Array<Array<TextContent>>,
    public readonly metaTags: Array<Array<TextContent>>,
    public readonly correctOptions: Array<number>,
    public readonly correctAnswerFeedback: Array<TextContent>,
    public readonly wrongAnswerFeedback: Array<TextContent>,
    public readonly hints: Array<Hint>,
    public readonly defaultLanguage: string,
    public readonly difficulty: number,
    public readonly estimatedTime: number,
    public readonly score: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
