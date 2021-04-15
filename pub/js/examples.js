/* JS Library usage examples */
"use strict";
console.log('----------')


const tempDiv = document.querySelector('#examplesDiv');


const newQuiz = new QuizBox(tempDiv);

newQuiz.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");

//newQuiz.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");


newQuiz.createFillInTheBlank(["Yellow is a ___ colour.", "___ stands for Central Processing Unit.", "An ___ has three hearts.", "The letter ___ is the most common letter used in the English language."], ["primary", "CPU", "octopus", "A"]);

newQuiz.createMultipleChoiceMany("Which of the following cities are located in Ontario? Select all that apply.", ["Toronto", "Brampton", "Hamilton", "Mississauga", "New York"], ["Toronto", "Brampton", "Hamilton", "Mississauga"]);

newQuiz.createMatching(["discomfit", "minatory", "gallant", "drub"], ["to put into a state of perplexity and embarrassment", "having a menacing quality", "having a menacing quality", "to beat severely", "choice3", "choice3"], [["choice 1", "option 1"], ["choice 2", "option 2"], ["choice 3", "option 3"], ["choice 4", "option 4"]]);
newQuiz.createTrueOrFalseQuestion(["Yellow is a primary colour.", "CPU stands for Central Processing Unit.", "An Octopus has three hearts.", "The letter A is the most common letter used in the English language."], [true, true, true, false]);

newQuiz.createSequenceQuestion(["Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs.", "First time landing on the Moon", "COVID-19."], ["COVID-19.", "First time landing on the Moon", "Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs."]);
newQuiz.addAnimationAll("Instant")

const newQuiz2 = new QuizBox(tempDiv);

// newQuiz2.createTrueOrFalseQuestion(["Yellow is a primary colour.", "CPU stands for Central Processing Unit.", "An Octopus has three hearts.", "The letter A is the most common letter used in the English language."], [true, true, true, false]);