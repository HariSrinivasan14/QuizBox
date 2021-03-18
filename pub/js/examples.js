/* JS Library usage examples */
"use strict";
console.log('----------')


const tempDiv = document.createElement('div');
document.querySelector('body').appendChild(tempDiv);


const newQuiz = new QuizBox(tempDiv);

newQuiz.createMultipleChoiceOne("This is a test question. Please choose one of the following options", ["option 1", "option 2", "option 3", "option 4", "option 0"], "option 2");
newQuiz.createMultipleChoiceMany("This is a test question. Please choose one of the following options", ["option 4", "option 5", "option 6", "option 7"], ["option 4", 'option 6']);

newQuiz.createTrueOrFalseQuestion(["Question 1", "Question 2", "Question 3", "Question 4", "Question 5"], [true, false]);


const newQuiz2 = new QuizBox(tempDiv);

