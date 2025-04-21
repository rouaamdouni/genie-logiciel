import { PathItem } from "./path-item.entity";

export class Checkpoint extends PathItem {
    constructor(
      public label: string,
      public contentFileURL: string,
      difficulty: number,
      score: number,
    ) {
      super(difficulty, score);
    }
  
    show() {
      console.log("Checkpoint content");
      console.log("Label", this.label);
      console.log("ContentFileURL", this.contentFileURL);
    }
  }