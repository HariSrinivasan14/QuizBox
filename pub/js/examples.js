/* JS Library usage examples */
"use strict";
console.log('----------')


const tempDiv = document.createElement('div');
document.querySelector('body').appendChild(tempDiv);


const newQuiz = new QuizBox(tempDiv);

// newQuiz.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");

// newQuiz.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");


newQuiz.createFillInTheBlank(["Yellow is a ___ colour.", "___ stands for Central Processing Unit.", "An ___ has three hearts.", "The letter ___ is the most common ___ used in the English language."], ["Yellow", "CPU", "octopus", "A", "letter"]);

newQuiz.createMultipleChoiceMany("Which of the following cities are located in Ontario? Select all that apply.", ["Toronto", "Brampton", "Hamilton", "Mississauga", "New York"], ["Toronto", "Brampton", "Hamilton", "Mississauga"]);


 newQuiz.createTrueOrFalseQuestion(["Yellow is a primary colour.", "CPU stands for Central Processing Unit.", "An Octopus has three hearts.", "The letter A is the most common letter used in the English language."], [true, true, true, false]);


 

// newQuiz.createSequenceQuestion(["Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs.", "First time landing on the Moon", "COVID-19."], ["COVID-19.", "First time landing on the Moon", "Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs."]);
