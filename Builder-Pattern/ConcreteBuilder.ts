// ========================
// 🧱 CONCRETE BUILDER
// ========================
class Builder implements IPathItemBuilder {
    private result: Array<PathItem> = [];
  
    addSuperSkill(label: string, description: string, contentFileURL: string, difficulty: number, score: number) {
      const superSkill = new SuperSkill(label, description, contentFileURL, difficulty, score);
      const lastItem = this.result[this.result.length - 1];
  
      if (lastItem) {
        lastItem.nextItem = superSkill;
        superSkill.prevItem = lastItem;
      }
  
      this.result = [...this.result, superSkill];
      return this;
    }
  
    addSkill(label: string, contentFileURL: string, difficulty: number, score: number) {
      const skill = new Skill(label, contentFileURL, difficulty, score);
      const lastItem = this.result[this.result.length - 1];
  
      if (lastItem) {
        lastItem.nextItem = skill;
        skill.prevItem = lastItem;
      }
  
      this.result = [...this.result, skill];
      return this;
    }
  
    addCheckpoint(label: string, contentFileURL: string, difficulty: number, score: number) {
      const checkpoint = new Checkpoint(label, contentFileURL, difficulty, score);
      const lastItem = this.result[this.result.length - 1];
  
      if (lastItem) {
        lastItem.nextItem = checkpoint;
        checkpoint.prevItem = lastItem;
      }
  
      this.result = [...this.result, checkpoint];
      return this;
    }
  
    addQuiz(label: string, questionsCount: number, totalTime: number, difficulty: number, score: number) {
      const quiz = new Quiz(label, questionsCount, totalTime, difficulty, score);
      const lastItem = this.result[this.result.length - 1];
  
      if (lastItem) {
        lastItem.nextItem = quiz;
        quiz.prevItem = lastItem;
      }
  
      this.result = [...this.result, quiz];
      return this;
    }
  
    addProject(label: string, contentFileURL: string, difficulty: number, score: number) {
      const project = new Project(label, contentFileURL, difficulty, score);
      const lastItem = this.result[this.result.length - 1];
  
      if (lastItem) {
        lastItem.nextItem = project;
        project.prevItem = lastItem;
      }
  
      this.result = [...this.result, project];
      return this;
    }
  
    reset() {
      this.result = [];
    }
  
    getResult(): Array<PathItem> {
      return this.result;
    }
  }
  