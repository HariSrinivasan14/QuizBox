/* JS Library usage examples */
"use strict";
console.log('----------')


const tempDiv = document.querySelector('#examplesDiv');


const newQuiz = new QuizBox(tempDiv);



newQuiz.createMultipleChoiceMany("Which of the following cities are located in Ontario? Select all that apply.", ["Toronto", "Brampton", "Hamilton", "Mississauga", "New York"], ["Toronto", "Brampton", "Hamilton", "Mississauga"]);
newQuiz.createFillInTheBlank(["Red is a ___ colour.", "RAM stands for ___.", "The capital city of Canada is ___.", "The hottest planet in our solar system is ___"], ["primary", "Random Access Memory", "Ottawa", "Venus"]);

newQuiz.createMatching("Matching the following Countries with their captial city", ["Switzerland", "South Korea", "Turkey", "Uganda"], ["Ankara", "Bern", "Seoul", "Kampala"], [["Switzerland", "Bern"],["South Korea", "Seoul"], ["Turkey", "Ankara"], ["Uganda", "Kampala"]]);


newQuiz.createTrueOrFalseQuestion(["Yellow is a primary colour.", "CPU stands for Central Processing Unit.", "An Octopus has three hearts.", "The letter A is the most common letter used in the English language."], [true, true, true, false]);

newQuiz.createSequenceQuestion(["Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs.", "First time landing on the Moon", "COVID-19."], ["COVID-19.", "First time landing on the Moon", "Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs."]);
newQuiz.setAnimationAll("Fade In")


const tempDiv2 = document.querySelector('#examplesDiv2');

const newQuiz2 = new QuizBox(tempDiv2);
newQuiz2.createSequenceQuestion(["Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs.", "First time landing on the Moon", "COVID-19."], ["COVID-19.", "First time landing on the Moon", "Invention of the Turing Machine.", "American Civil War.", "Extinction of Dinosaurs."]);

newQuiz2.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");

newQuiz2.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");




const tempDiv3 = document.querySelector('#examplesDiv3');
const newQuiz3 = new QuizBox(tempDiv3);
newQuiz3.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");
newQuiz3.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");



const tempDiv4 = document.querySelector('#examplesDiv4');
const newQuiz4 = new QuizBox(tempDiv4);
newQuiz4.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");
newQuiz4.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");
newQuiz4.setAnimationAll("Scroll")

const tempDiv5 = document.querySelector('#examplesDiv5');
const newQuiz5 = new QuizBox(tempDiv5);
newQuiz5.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");
newQuiz5.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");
newQuiz5.setAnimationAll("Reveal")


const tempDiv6 = document.querySelector('#examplesDiv6');
const newQuiz6 = new QuizBox(tempDiv6);
newQuiz6.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");
newQuiz6.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");
newQuiz6.setAnimationAll("Slide Down")

const tempDiv7 = document.querySelector('#examplesDiv7');
const newQuiz7 = new QuizBox(tempDiv7);
newQuiz7.createMultipleChoiceOne("What does HTML stand for?", ["HyperText Machine Learning", "HyperText Markup Language", "Hyper Machine Language", "None of the above", "All of the above"], "HyperText Markup Language");
newQuiz7.createMultipleChoiceOne("What does CSS stand for?", ["Computer Style Sheets", "Colour Style Sheets", "Cascading Style Sheets", "None of the above"], "Cascading Style Sheets");
newQuiz7.setAnimationAll("Fade In")


