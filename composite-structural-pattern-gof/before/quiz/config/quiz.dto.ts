import { TextContent } from "../../../utils/types"

export class QuizDTO {
  constructor(
    public readonly quizId: string,
    public readonly slug: string,
    public readonly label: Array<TextContent>,
    public readonly metaTags: Array<Array<TextContent>>,
    public readonly defaultLanguage: string,
    public readonly questionsCount: number,
    public readonly totalTime: number,
    public readonly score: number,
    public readonly difficulty: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
