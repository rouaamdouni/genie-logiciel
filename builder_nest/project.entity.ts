export class Project extends PathItem {
    constructor(
      public label: string,
      public contentFileURL: string,
      difficulty: number,
      score: number,
    ) {
      super(difficulty, score);
    }
  
    show() {
      console.log("Project content");
      console.log("Label", this.label);
      console.log("ContentFileURL", this.contentFileURL);
    }
  }
  