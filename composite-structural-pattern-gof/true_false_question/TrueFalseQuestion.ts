import Hint from "../hint/Hint";
import SubQuiz from "../SubQuiz";

export default class TrueFalseQuestion extends SubQuiz {
    constructor(      
        public headline: string,
        public idealOption: boolean,
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
        console.log("Ideal option", this.idealOption);
    }
}
