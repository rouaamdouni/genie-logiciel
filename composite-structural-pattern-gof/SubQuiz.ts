import CourseElement from "./interfaces/i-CourseElement";

export default abstract class SubQuiz implements CourseElement {
    constructor(
        public score: number,
        public difficulty: number,
        public estimatedTime: number,
        public prevSubQuiz?: SubQuiz,
        public nextSubQuiz?: SubQuiz
  ) {}

    abstract show(): void
}