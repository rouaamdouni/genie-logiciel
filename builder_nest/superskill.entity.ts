import { PathItem } from "./path-item.entity";

 
export class SuperSkill extends PathItem {
    constructor(
      public label: string,
      public description: string,
      public contentFileURL: string,
      difficulty: number,
      score: number,
    ) {
      super(difficulty, score);
    }
  
    show() {
      console.log("Super Skill content");
      console.log("Label", this.label);
      console.log("ContentFileURL", this.contentFileURL);
    }
  }