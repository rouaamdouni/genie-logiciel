import CourseElement from "./i-CourseElement";
import SubQuiz from "./SubQuiz";

export default class Quiz implements CourseElement {
    private subQuizzes: Array<SubQuiz>
    public questionsCount: number;
    public totalTime: number;
    public score: number;
    public difficulty: number;

  constructor(
    public quizId: string,
    public slug: string,
    public label: string,
  ) {
    this.subQuizzes = [];
    this.questionsCount = 0;
    this.totalTime = 0;
    this.score = 0;
    this.difficulty = 0;
  }

  public show() {
    const firstSubQuiz = this.subQuizzes.find(subQuiz => !subQuiz.prevSubQuiz)

    if (firstSubQuiz) {
        let temp = firstSubQuiz
        while (!!temp.nextSubQuiz) {
            console.log("===========")
            temp.show()
            temp = temp.nextSubQuiz
        }
    }

  }

  public addSubQuiz(subQuiz: SubQuiz) {
    const lastSubQuiz = this.subQuizzes[this.subQuizzes.length - 1]
    if (lastSubQuiz) {
        lastSubQuiz.nextSubQuiz = subQuiz;
        subQuiz.prevSubQuiz = lastSubQuiz;
    }

    this.subQuizzes = [...this.subQuizzes, subQuiz]

    this.questionsCount += 1;
    this.totalTime += subQuiz.estimatedTime;
    this.score += subQuiz.score;
    
    let difficulty = 0;
    this.subQuizzes.forEach(subQuiz => {
        difficulty += subQuiz.difficulty;
    })

    difficulty = Math.round(difficulty / this.subQuizzes.length);
    this.difficulty = difficulty;
  }

  public removeSubQuiz(index: number) {
    const subQuizAtIndex = this.subQuizzes[index];

    if (subQuizAtIndex) {
        const prevSubQuiz = subQuizAtIndex.prevSubQuiz
        const nextSubQuiz = subQuizAtIndex.nextSubQuiz

        if (prevSubQuiz) prevSubQuiz.nextSubQuiz = nextSubQuiz
        if (nextSubQuiz) nextSubQuiz.prevSubQuiz = prevSubQuiz
    }

    this.subQuizzes.splice(index, 1);

    this.questionsCount -= 1;
    this.totalTime -= subQuizAtIndex.estimatedTime;
    this.score -= subQuizAtIndex.score;
    
    let difficulty = 0;
    this.subQuizzes.forEach(subQuiz => {
        difficulty += subQuiz.difficulty;
    })

    difficulty = Math.round(difficulty / this.subQuizzes.length);
    this.difficulty = difficulty;
  }
}
