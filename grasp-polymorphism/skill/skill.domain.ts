import { TextContent } from "../utils/types";

export class Skill {
  constructor(
    public readonly skillId: string,
    public readonly slug: string,
    public readonly label: Array<TextContent>,
    public readonly contentFileURL: Array<TextContent>,
    public readonly metaTags: Array<Array<TextContent>>,
    public readonly defaultLanguage: string,
    public readonly score: number,
    public readonly difficulty: number,
  ) {}
}
