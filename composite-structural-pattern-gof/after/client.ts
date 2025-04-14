import ChoiceQuestion from "./ChoiceQuestion";
import Hint from "./Hint";
import Quiz from "./Quiz";
import TrueFalseQuestion from "./TrueFalseQuestion";
import UniqueChoiceQuestion from "./UniqueChoiceQuestion";

const quiz = new Quiz("Quiz_1", "learn_html", "Learn HTML");

const hint1 = new Hint(5, "Think about what makes a language true or false.");
const hint2 = new Hint(6, "Review the basic concept of true/false logic.");

const trueFalseQuestion = new TrueFalseQuestion(
    "Is HTML a programming language?", 
    true, 
    "Correct! HTML is not a programming language, but a markup language.", 
    "Incorrect! HTML is not a programming language.",  
    [hint1, hint2], 
    10,
    1,  
    15  
);

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

const hint3 = new Hint(5, "Think about the basic features of CSS.");
const hint4 = new Hint(7, "CSS is mainly used for styling websites.");
const uniqueChoiceQuestion = new UniqueChoiceQuestion(
    "What does CSS stand for?",
    ["HTML", "Cascading Style Sheets", "JavaScript", "None of the above"] ,
    1,  
    "Correct! CSS stands for Cascading Style Sheets.",  
    "Incorrect! CSS does not stand for this.",  
    [hint3, hint4], 
    20, 
    2,  
    30 
);
quiz.addSubQuiz(subQuiz1);
quiz.addSubQuiz(uniqueChoiceQuestion);
quiz.addSubQuiz(trueFalseQuestion);
quiz.show();