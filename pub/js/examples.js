/* JS Library usage examples */
"use strict";
console.log('----------')


const tempDiv = document.createElement('div');
document.querySelector('body').appendChild(tempDiv);


const newQuiz = new QuizBox(tempDiv);

newQuiz.createMultipleChoiceOne("This is a test question. Please choose one of the following options", ["option 1", "option 2", "option 3", "option 4", "option 0"], "option 2");


newQuiz.createMultipleChoiceMany("Which of the following cities are located in Ontario? Select all that apply.", ["Toronto", "Brampton", "Hamilton", "Mississauga", "New York"], ["Toronto", "Brampton", "Hamilton", "Mississauga"]);

// question take from https://www.cosmopolitan.com/uk/worklife/a32612392/best-true-false-quiz-questions/
newQuiz.createTrueOrFalseQuestion(["Australia is wider than the moon.", "An octopus has three hearts.", "Bananas are curved because they grow upwards towards the sun.", "the letter A is the most common letter used in the English language."], [true, true, true, false]);


newQuiz.createSequenceQuestion(["Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs.", "First time landing on the Moon", "COVID-19."], ["COVID-19.", "First time landing on the Moon", "Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs."]);
