/* JS Libraries */
"use strict";
console.log('----------')
console.log('SCRIPT: Creating and loading the JS libraries')

function QuizBox(mainDiv) {
	this.questions = [];
	this.typeQuestions = [];
	this.currentQuestion = 0;
	this.numQuestions = 0;
	this.answersToQuestions = [];
	
	this.QuizBoxDiv = document.createElement('div');
	this.QuizBoxDiv.className = "QuizBox-style";
	mainDiv.append(this.QuizBoxDiv);
	this.addNavigationButtons();
	

}


QuizBox.prototype = {

	handleClickPre: function(e) {
		if((this.currentQuestion - 1) < 0){
			return;
		}
		this.questions[this.currentQuestion].className = "displayNone";
		this.currentQuestion -= 1;
		this.questions[this.currentQuestion].className = this.typeQuestions[this.currentQuestion];
		const updateSelectNum = this.QuizBoxDiv.children[0].children[1].children[0];
		updateSelectNum.value = this.currentQuestion + 1;
	},
	
	
	handleClickNext: function(e) {
		if(this.currentQuestion === (this.numQuestions - 1) || (this.currentQuestion === 0 && this.numQuestions === 0)){
			return;
		}

		this.questions[this.currentQuestion].className = "displayNone";
		this.currentQuestion += 1;
		this.questions[this.currentQuestion].className = this.typeQuestions[this.currentQuestion];
		const updateSelectNum = this.QuizBoxDiv.children[0].children[1].children[0];
		updateSelectNum.value = this.currentQuestion + 1;
	},
	
	
	handleClickChoiceOne: function(e) {
		let parentDivChildren = e.target.parentElement.children;
		let isText = false;

		if(e.target.parentElement.className === "questionMultipleChoiceOneDivDefault-style" || e.target.parentElement.className === "questionMultipleChoiceOneDivBlue-style"){
			parentDivChildren = e.target.parentElement.parentElement.children;
			isText = true;
		}
		
		for(let counter = 1; counter < parentDivChildren.length; counter++){
			if( !(isText) &&(parentDivChildren[counter].innerHTML === e.target.innerHTML)){
				parentDivChildren[counter].className = "questionMultipleChoiceOneDivBlue-style";
			}else if(isText && (parentDivChildren[counter].children[0].innerHTML === e.target.innerHTML)){
				parentDivChildren[counter].className = "questionMultipleChoiceOneDivBlue-style";
			}else{
				parentDivChildren[counter].className = "questionMultipleChoiceOneDivDefault-style";
			}
		}
	},


	handleClickChoiceMany: function(e) {
		let parentDiv = e.target

		if(e.target.parentElement.className === "questionMultipleChoiceManyDivDefault-style" || e.target.parentElement.className === "questionMultipleChoiceManyDivBlue-style"){
			parentDiv = e.target.parentElement;
		}
		
		if(parentDiv.className === "questionMultipleChoiceManyDivDefault-style"){
				parentDiv.className = "questionMultipleChoiceManyDivBlue-style";
		}else if(parentDiv.className === "questionMultipleChoiceManyDivBlue-style"){
				parentDiv.className = "questionMultipleChoiceManyDivDefault-style";
		}
	},
	updateNav: function(newQuestionNum) {
		let updateSelect = this.QuizBoxDiv.children[0].children[1].children[0];
		let updateTotalQuestion = this.QuizBoxDiv.children[0].children[1].children[1];
		
		const tempOption = document.createElement("option");
		tempOption.value = newQuestionNum;
		tempOption.innerHTML = newQuestionNum;
		updateSelect.appendChild(tempOption);
		
		updateTotalQuestion.innerHTML = "of " + newQuestionNum;
	},
	changeQuestion: function(e) {
		
		this.questions[this.currentQuestion].className = "displayNone";
		this.currentQuestion = e.target.value - 1;
		this.questions[this.currentQuestion].className = this.typeQuestions[this.currentQuestion];
		
	},
	
	addNavigationButtons: function() {
		// TODO
		const nextButton = document.createElement('Button');
		const preButton = document.createElement('Button');
		const navigationDiv = document.createElement('div');
		const numQuestionDiv = document.createElement('div');
		const nextButtonText = document.createTextNode('Next');
		const preButtonText = document.createTextNode('Previous');
		
		nextButton.className = "nextButton-style";
		preButton.className = "preButton-style";
		navigationDiv.className = "navigationDiv-style";
		
		nextButton.appendChild(nextButtonText);
		preButton.appendChild(preButtonText);
		
		
		const questionList = document.createElement('select'); 
		const totalQuestion = document.createElement('p');
		questionList.className = "select-style";
		totalQuestion.className = "totalQuestion";
		totalQuestion.innerHTML = "of " + this.numQuestions;
		
		numQuestionDiv.className = "navQuestionDiv";
		numQuestionDiv.appendChild(questionList);
		numQuestionDiv.appendChild(totalQuestion);
		
		questionList.addEventListener("change", this.changeQuestion.bind(this));
		
		
		navigationDiv.appendChild(preButton);
		navigationDiv.appendChild(numQuestionDiv);
		navigationDiv.appendChild(nextButton);
		
		preButton.addEventListener('click', this.handleClickPre.bind(this))
		nextButton.addEventListener('click', this.handleClickNext.bind(this))

		this.QuizBoxDiv.appendChild(navigationDiv);

	},
	createSubmitPage: function() {
		const lastDiv = document.createElement('div');
		const lastDivQuestions = document.createElement('div');
		const lastDivSubmit = document.createElement('div');
		const submitButton = document.createElement('button');
		const questionBox = document.createElement('div');
		const questionTextBox = document.createElement('p');
		
		
		questionTextBox.innerHTML = "Question 1";
		questionTextBox.className = "questionLastDivText"; 
		questionBox.appendChild(questionTextBox);
		questionBox.classList = "questionLastDiv";
		lastDivQuestions. className = "lastDivQuestion-style" 
		
		
		submitButton.innerHTML = "Submit";
		submitButton.className = "submitButton";
		
		submitButton.addEventListener('click', this.gradeAnswers.bind(this));
		
		lastDivQuestions.appendChild(questionBox);
		lastDiv.appendChild(lastDivQuestions);
		
		lastDivSubmit.appendChild(submitButton);
		lastDiv.appendChild(lastDivSubmit);
		
		lastDiv.className = "displayNone";
		this.QuizBoxDiv.append(lastDiv);
		this.questions.push(lastDiv);
		this.typeQuestions.push("lastDiv-style");
		this.updateNav(this.numQuestions + 1);
		this.numQuestions += 1;
		
	},
	
	updateSubmitPage: function(questionNum) {
		const questionBox = document.createElement('div');
		const questionTextBox = document.createElement('p');
		
		
		questionTextBox.innerHTML = "Question " + questionNum;
		questionTextBox.className = "questionLastDivText"; 
		questionBox.appendChild(questionTextBox);
		questionBox.classList = "questionLastDiv";
		
		this.QuizBoxDiv.lastChild.children[0].appendChild(questionBox);
		
		
	},
	
	createMultipleChoiceOne: function(question, options, answer) {
		// TODO
		this.answersToQuestions.push(answer);
		const questionMultipleOne = document.createElement('div');
		const questionText = document.createElement('p');
		

		// adding elements to the div
		questionText.appendChild(document.createTextNode(question));
		questionText.className = "questionMultipleChoiceOneText-style";
		questionMultipleOne.appendChild(questionText);
		
		for(let counter = 0; counter < options.length; counter++){
			const tempButton = document.createElement('button');
			const tempSpan = document.createElement('span');
			tempSpan.innerHTML = options[counter];
			tempSpan.className = "questionMultipleChoiceOneSpan";
			tempButton.appendChild(tempSpan);
			tempButton.addEventListener('click', this.handleClickChoiceOne)
			tempButton.className = "questionMultipleChoiceOneDivDefault-style";
			questionMultipleOne.appendChild(tempButton);
			
		}
		
		this.typeQuestions.push("questionMultipleChoiceOne-style");
		this.questions.push(questionMultipleOne);
		
		if(this.numQuestions !== 0){
			questionMultipleOne.className = "displayNone";
			
			[this.typeQuestions[this.typeQuestions.length - 1], this.typeQuestions[this.typeQuestions.length - 2]] = [this.typeQuestions[this.typeQuestions.length - 2], this.typeQuestions[this.typeQuestions.length - 1]];
			
			
			[this.questions[this.questions.length - 1], this.questions[this.questions.length - 2]] = [this.questions[this.questions.length - 2], this.questions[this.questions.length - 1]];
			
			this.QuizBoxDiv.insertBefore(questionMultipleOne, this.QuizBoxDiv.lastChild);
			this.updateSubmitPage(this.numQuestions);
			
		}else{
			questionMultipleOne.className = "questionMultipleChoiceOne-style";

			this.QuizBoxDiv.appendChild(questionMultipleOne);
			this.createSubmitPage();
		}
		
		this.updateNav(this.numQuestions + 1);
		this.numQuestions += 1;
		return;
	},

	createMultipleChoiceMany: function(question, options, answer) {
		// TODO
		this.answersToQuestions.push(answer);
		const questionMultipleMany = document.createElement('div');
		const questionText = document.createElement('p');
		
		
		questionText.appendChild(document.createTextNode(question));
		questionText.className = "questionMultipleChoiceManyText-style";
		questionMultipleMany.appendChild(questionText);
		
		for(let counter = 0; counter < options.length; counter++){
			const tempButton = document.createElement('button');
			const tempSpan = document.createElement('span');
			tempSpan.className = "questionMultipleChoiceManySpan";
			tempSpan.innerHTML = options[counter];
			tempButton.appendChild(tempSpan);
			tempButton.addEventListener('click', this.handleClickChoiceMany)
			tempButton.className = "questionMultipleChoiceManyDivDefault-style";
			questionMultipleMany.appendChild(tempButton);
			
		}
		
		this.typeQuestions.push("questionMultipleChoiceMany-style");
		this.questions.push(questionMultipleMany);


		if(this.numQuestions !== 0){
			questionMultipleMany.className = "displayNone";
			
			[this.typeQuestions[this.typeQuestions.length - 1], this.typeQuestions[this.typeQuestions.length - 2]] = [this.typeQuestions[this.typeQuestions.length - 2], this.typeQuestions[this.typeQuestions.length - 1]];
			
			[this.questions[this.questions.length - 1], this.questions[this.questions.length - 2]] = [this.questions[this.questions.length - 2], this.questions[this.questions.length - 1]];
			
			this.QuizBoxDiv.insertBefore(questionMultipleMany, this.QuizBoxDiv.lastChild);
			this.updateSubmitPage(this.numQuestions);
			
		}else{
			questionMultipleMany.className = "questionMultipleChoiceMany-style";
			this.QuizBoxDiv.appendChild(questionMultipleMany);
			this.createSubmitPage();
		}

		this.updateNav(this.numQuestions + 1);
		this.numQuestions += 1;

		return;
	},
	
	trueOrFalseDragStart: function(e){
		e.target.classList.add('dragging');
	},
	
	
	trueOrFalseDragEnd: function(e){
		e.target.classList.remove('dragging');

	},
	
	
	trueOrFalseDragOver: function(e){
		e.preventDefault();
		const elementDragging = document.querySelector('.dragging');
		try{
			e.target.appendChild(elementDragging);
		}catch{
			return;
		}
	},
	
	
	createTrueOrFalseQuestion: function(question, answer){
		this.answersToQuestions.push(answer);
		const mainDiv = document.createElement('div');
		const trueDiv = document.createElement('div');
		const falseDiv = document.createElement('div');
		const startDiv = document.createElement('div');
		const interactDiv = document.createElement('div');
		const questionDiv = document.createElement('div');
		const headerDiv = document.createElement('div');
		
		trueDiv.className = "trueDiv";
		falseDiv.className = "falseDiv";
		startDiv.className = "startDiv";
		interactDiv.className = "interactDiv"
		questionDiv.className = "questionDiv";
		
		const questionHeader = document.createElement('p');
		questionHeader.innerHTML = "True or False?";
		questionHeader.className = "questionTrueOrFalseHeader-style";
		headerDiv.className = "headerDiv";
		headerDiv.appendChild(questionHeader);
		
		const toolTip = document.createElement('div');
		toolTip.innerHTML = "(How to answer?)"
		toolTip.className = "toolTipDiv";
		const toolTipText = document.createElement('span');
		toolTipText.innerHTML = "Drag the blue tiles into true box if the statement is true. Otherwise drag the tile into the false box. Note S1 refers to statement 1, S2 refers to statement 2, etc.";
		toolTipText.className = "toolTipText";
		toolTip.appendChild(toolTipText);
		
		headerDiv.appendChild(questionHeader);
		headerDiv.appendChild(toolTip);
		mainDiv.appendChild(headerDiv);
		
		for(let counter = 0; counter < question.length; counter++){
			const tempP = document.createElement('p');
			const tempQuestion = document.createElement('p');
			tempQuestion.innerHTML = question[counter];
			tempQuestion.className = "questionTrueOrFalseText-style";
			tempP.className = "questionP";
			tempP.innerHTML = "S" + (counter + 1) + "";
			tempP.setAttribute('draggable', true);
			
			tempP.addEventListener("dragstart", this.trueOrFalseDragStart );
			tempP.addEventListener("dragend", this.trueOrFalseDragEnd);
			
			questionDiv.appendChild(tempQuestion);
			startDiv.appendChild(tempP);
		}
		
		startDiv.addEventListener("dragover", this.trueOrFalseDragOver);
		falseDiv.addEventListener("dragover", this.trueOrFalseDragOver);
		trueDiv.addEventListener("dragover", this.trueOrFalseDragOver);
		
		
		interactDiv.appendChild(falseDiv);
		interactDiv.appendChild(trueDiv);
		mainDiv.appendChild(questionDiv);
		mainDiv.appendChild(startDiv);
		mainDiv.appendChild(interactDiv);

		
		

		this.questions.push(mainDiv);
		this.typeQuestions.push("questionTrueOrFalse-style");
		
		if(this.numQuestions !== 0){
			mainDiv.className = "displayNone";
			
			[this.typeQuestions[this.typeQuestions.length - 1], this.typeQuestions[this.typeQuestions.length - 2]] = [this.typeQuestions[this.typeQuestions.length - 2], this.typeQuestions[this.typeQuestions.length - 1]];
			
			
			[this.questions[this.questions.length - 1], this.questions[this.questions.length - 2]] = [this.questions[this.questions.length - 2], this.questions[this.questions.length - 1]];
			
			this.QuizBoxDiv.insertBefore(mainDiv, this.QuizBoxDiv.lastChild);
			this.updateSubmitPage(this.numQuestions);
			
		}else{
			mainDiv.className = "questionTrueOrFalse-style";
			this.QuizBoxDiv.appendChild(mainDiv);
			this.createSubmitPage();
		}

		this.updateNav(this.numQuestions + 1);
		this.numQuestions += 1;
	},
	
	
	gradeAnswers: function() {
		const questionToBeGraded = this.QuizBoxDiv.children;
		const boxesChangeColor = this.QuizBoxDiv.lastChild.children[0].children;
		console.log(this.QuizBoxDiv.lastChild.children[0].children);
		let totalScore = 0;
		for(let counter = 1; counter < questionToBeGraded.length; counter++){
			let tempScore = 0;
			if(this.typeQuestions[counter - 1] ===  "questionMultipleChoiceOne-style"){
				tempScore = this.gradeMultipleChoice(questionToBeGraded[counter].children, this.answersToQuestions[counter - 1]);
				if(tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}
			}else if(this.typeQuestions[counter - 1] ===  "questionMultipleChoiceMany-style"){
				tempScore = this.gradeMultipleChoiceMany(questionToBeGraded[counter].children, this.answersToQuestions[counter - 1]);
				if(tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else if((tempScore > 0 && tempScore < this.answersToQuestions[counter - 1].length) || tempScore === -1){
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
					if(tempScore === -1){
						tempScore = 0;
					}
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}
			}else if(this.typeQuestions[counter - 1] === "questionTrueOrFalse-style"){
				
			}
			totalScore += tempScore;
		}
		return;
	},
	
	gradeMultipleChoice: function(optionsToBeGraded, answer) {
		
		for(let optionCounter = 1; optionCounter < optionsToBeGraded.length; optionCounter++){
			let tempOption = optionsToBeGraded[optionCounter];
			if(tempOption.className === "questionMultipleChoiceOneDivBlue-style"){
				if(tempOption.children[0].innerHTML === answer){
					return 1;
				}else{
					return 0;
				}
			}
		}
		return 0;
	},
	
	gradeMultipleChoiceMany: function(optionsToBeGraded, answer) {
		let score = 0;
		for(let optionCounter = 1; optionCounter < optionsToBeGraded.length; optionCounter++){
			let tempOption = optionsToBeGraded[optionCounter];
			if(tempOption.className === "questionMultipleChoiceManyDivBlue-style"){
				if(answer.indexOf(tempOption.children[0].innerHTML) >= 0){
					score += 1
				}else{
					return -1;
				}
			}
		}
		return score;
	}
	
}


