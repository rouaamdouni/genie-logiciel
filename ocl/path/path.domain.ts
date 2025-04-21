import { Category } from "src/utils/constants"

import { TextContent } from "../../../utils/types"

export class Path {
  constructor(
    public readonly pathId: string,
    public readonly slug: string,
    public readonly label: Array<TextContent>,
    public readonly description: Array<TextContent>,
    public readonly metaTags: Array<Array<TextContent>>,
    public readonly defaultLanguage: string,
    public readonly category: Category,
    public readonly coverURL: string,
    public readonly itemsCount: number,
    public readonly superSkillsCount: number,
    public readonly skillsCount: number,
    public readonly quizzesCount: number,
    public readonly checkpointsCount: number,
    public readonly rewardsCount: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly deletedAt?: Date,
  ) {}
}
