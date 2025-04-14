import Hint from "./Hint";
import SubQuiz from "./SubQuiz";

export default class UniqueChoiceQuestion extends SubQuiz {
    constructor(      
        public headline: string,
        public options: Array<string>,
        public idealOption: number,
        public correctAnswerFeedback: string,
        public wrongAnswerFeedback: string,
        public hints: Array<Hint>,
        score: number,
        difficulty: number,
        estimatedTime: number,
    ) {
        super(score, difficulty, estimatedTime);
    }

    public show() {
        console.log("Headline", this.headline);
        console.log("Options", this.options);
        console.log("Correct option", this.idealOption);
    }
}
