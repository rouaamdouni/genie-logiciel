import { TextContent } from "../utils/types";

export class Quiz {
  constructor(
    public readonly quizId: string,
    public readonly slug: string,
    public readonly label: Array<TextContent>,
    public readonly metaTags: Array<Array<TextContent>>,
    public readonly questionsCount: number,
    public readonly totalTime: number,
    public readonly defaultLanguage: string,
  ) {}
}