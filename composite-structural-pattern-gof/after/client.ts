import ChoiceQuestion from "./ChoiceQuestion";
import Quiz from "./Quiz";

const quiz = new Quiz("Quiz_1", "learn_html", "Learn HTML");

const subQuiz1 = new ChoiceQuestion(
    "What is HTML?", 
    ["A markup language", "A programming language", "A type of pasta", "A web framework"], 
    [0], 
    "Correct answer! HTML is a markup language used for structuring web content.", 
    "Incorrect answer. HTML is not a programming language.",
    [{ requiredScore: 5, content: "Review the basics of HTML." }],
    20, 
    1, 
    50
);

const subQuiz2 = new ChoiceQuestion(
    "What is CSS?", 
    ["A styling language", "A server-side language", "A database", "A markup language"], 
    [0], 
    "Correct! CSS is used for styling web pages.",
    "Incorrect. CSS is not a server-side language.",
    [{ requiredScore: 5, content: "Learn the basics of CSS for styling web pages." }],
    20, 
    1, 
    50
);
quiz.addSubQuiz(subQuiz1);
quiz.addSubQuiz(subQuiz2);
quiz.show();