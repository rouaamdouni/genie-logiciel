// ========================
// BUILDER
// ========================
interface IPathItemBuilder { 
    addSuperSkill(label: string, description: string, contentFileURL: string, difficulty: number, score: number): this;
    addSkill(label: string, contentFileURL: string, difficulty: number, score: number): this;
    addCheckpoint(label: string, contentFileURL: string, difficulty: number, score: number): this;
    addQuiz(label: string, questionsCount: number, totalTime: number, difficulty: number, score: number): this;
    addProject(label: string, contentFileURL: string, difficulty: number, score: number): this;
    reset(): void;
    getResult(): Array<PathItem>;
  }
  