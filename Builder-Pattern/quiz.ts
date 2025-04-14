class Quiz extends PathItem {
    constructor(
      public label: string,
      public questionsCount: number,
      public totalTime: number,
      difficulty: number,
      score: number,
    ) {
      super(difficulty, score)
    }
  
        show() {
          console.log("Quiz content")
          console.log("Label", this.label)
          console.log("questionsCount", this.questionsCount)
      }
  }