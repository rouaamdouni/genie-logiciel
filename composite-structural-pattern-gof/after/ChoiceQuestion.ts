import Hint from "./Hint";
import SubQuiz from "./SubQuiz";

export default class ChoiceQuestion extends SubQuiz {
    constructor(      
        public headline: string,
        public options: Array<string>,
        public correctOptions: Array<number>,
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
        console.log("Correct options", this.correctOptions);
    }
}
