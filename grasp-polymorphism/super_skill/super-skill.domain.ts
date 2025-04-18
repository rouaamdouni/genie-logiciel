import { TextContent } from "../utils/types";

export class SuperSkill {
  constructor(
    public readonly superSkillId: string,
    public readonly slug: string,
    public readonly label: Array<TextContent>,
    public readonly description: Array<TextContent>,
    public readonly contentFileURL: Array<TextContent>,
    public readonly metaTags: Array<Array<TextContent>>,
    public readonly defaultLanguage: string,
    public readonly difficulty: number,
    public readonly score: number,
  ) {}
}
