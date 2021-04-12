/* JS Libraries */
"use strict";


function QuizBox(mainDiv) {

	this.currentQuestion = 0;
	this.numQuestions = 0;
	this.isGraded = false;
	
	this.QuizBoxDiv = document.createElement('div');
	this.QuizBoxDiv.className = "QuizBox-style";
	mainDiv.append(this.QuizBoxDiv);
	this.addNavigationButtons();
	
	
	this.questionObjects = [];

}


QuizBox.prototype = {

	handleClickPre: function(e) {
		if((this.currentQuestion - 1) < 0){
			return;
		}
		this.questionObjects[this.currentQuestion].question.className = "displayNone";
		this.currentQuestion -= 1;
		this.questionObjects[this.currentQuestion].question.className = this.questionObjects[this.currentQuestion].typeQuestion;
		if(this.isGraded){
			this.questionObjects[this.currentQuestion].question.classList.add('graded');
		}
		const updateSelectNum = this.QuizBoxDiv.children[0].children[1].children[0];
		updateSelectNum.value = this.currentQuestion + 1;
	},
	
	
	handleClickNext: function(e) {
		if(this.currentQuestion === (this.numQuestions - 1) || (this.currentQuestion === 0 && this.numQuestions === 0)){
			return;
		}

		this.questionObjects[this.currentQuestion].question.className = "displayNone";
		this.currentQuestion += 1;
		this.questionObjects[this.currentQuestion].question.className = this.questionObjects[this.currentQuestion].typeQuestion;
		if(this.isGraded){
			this.questionObjects[this.currentQuestion].question.classList.add('graded');
		}
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
		
		this.questionObjects[this.currentQuestion].question.className = "displayNone";
		this.currentQuestion = e.target.value - 1;
		this.questionObjects[this.currentQuestion].question.className = this.questionObjects[this.currentQuestion].typeQuestion;
		if(this.isGraded){
			this.questionObjects[this.currentQuestion].question.className.classList.add('graded');
		}
		
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
		lastDivQuestions.className = "lastDivQuestion-style" 
		
		
		submitButton.innerHTML = "Submit";
		submitButton.className = "submitButton";
		
		submitButton.addEventListener('click', this.gradeAnswers.bind(this));
		
		lastDivQuestions.appendChild(questionBox);
		lastDiv.appendChild(lastDivQuestions);
		
		lastDivSubmit.appendChild(submitButton);
		lastDivSubmit.className = "scoreAndSubmitDiv";
		lastDiv.appendChild(lastDivSubmit);
		
		lastDiv.className = "displayNone";
		
		const QuestionObject = {question: lastDiv, typeQuestion: "lastDiv-style", answersToQuestion: null};
		this.questionObjects.push(QuestionObject);
		
		
		this.QuizBoxDiv.append(lastDiv);

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
	
	updateAttributes: function(div, divClassName, answers) {
		const QuestionObject = {question: div, typeQuestion: divClassName, answersToQuestion: answers};
		this.questionObjects.push(QuestionObject);
		
		if(this.numQuestions !== 0){
			QuestionObject.question.className = "displayNone";
			
			[this.questionObjects[this.questionObjects.length - 1], this.questionObjects[this.questionObjects.length - 2]] = [this.questionObjects[this.questionObjects.length - 2], this.questionObjects[this.questionObjects.length - 1]];
			
			this.QuizBoxDiv.insertBefore(div, this.QuizBoxDiv.lastChild);
			this.updateSubmitPage(this.numQuestions);
			
		}else{
			QuestionObject.question.className = divClassName;
			
			this.QuizBoxDiv.appendChild(div);
			this.createSubmitPage();
		}
		
		this.updateNav(this.numQuestions + 1);
		this.numQuestions += 1;
	},
	
	
	createMultipleChoiceOne: function(question, options, answer) {
		// TODO
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
		
		this.updateAttributes(questionMultipleOne ,"questionMultipleChoiceOne-style", answer);
		return;
	},

	createMultipleChoiceMany: function(question, options, answer) {
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
		


		this.updateAttributes(questionMultipleMany ,"questionMultipleChoiceMany-style", answer);
		return;
	},
	
	dragStart: function(e){
		e.target.classList.add('draggingTile');
	},
	
	
	dragEnd: function(e){
		e.target.classList.remove('draggingTile');

	},
	
	
	trueOrFalseDragOver: function(e){
		e.preventDefault();
		const elementDragging = document.querySelector('.draggingTile');
		try{
			if(e.target.className === "trueDiv" || e.target.className === "falseDiv" || e.target.className === "startDiv"){
				e.target.appendChild(elementDragging);
			}
		}catch{
			return;
		}
	},
	getClosestElement: function(tileArray, cursorYPosition){
		return tileArray.reduce((closestTile, tileElement) => {
			const tileElementBounds = tileElement.getBoundingClientRect();
			const position = cursorYPosition - (tileElementBounds.height / 2) - tileElementBounds.top;
			if(position > closestTile.position && position < 0){
				return {tile: tileElement, position: position};
			}else{
				return closestTile;
			}
		}, {position: Number.NEGATIVE_INFINITY}).tile;
	},
	sequenceDragOver: function(e){
		e.preventDefault();
		const elementDragging = document.querySelector('.draggingTile');
		let notDraggingElementsNodeList = e.target.querySelectorAll('.eventTile:not(.draggingTile)');
		const notDraggingElements = [];
		for(let counter = 0; counter < notDraggingElementsNodeList.length; counter++ ){
			notDraggingElements.push(notDraggingElementsNodeList[counter]);
		}
		const closestElement = this.getClosestElement(notDraggingElements, e.clientY);
		try{
			if(e.target.className === "eventTextDiv-style" || e.target.className === "eventDropDiv-style"){
				if(closestElement === null){
					e.target.appendChild(elementDragging);
				}else{
					e.target.insertBefore(elementDragging, closestElement);
				}
			}
		}catch{
			return;
		}
	},
	createTrueOrFalseQuestion: function(question, answer){
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
		toolTipText.innerHTML = "Drag the blue tiles into green box if the statement is true. Otherwise drag the tile into the red box. Note S1 refers to statement 1, S2 refers to statement 2, etc.";
		toolTipText.className = "toolTipText";
		toolTip.appendChild(toolTipText);
		
		headerDiv.appendChild(questionHeader);
		headerDiv.appendChild(toolTip);
		mainDiv.appendChild(headerDiv);
		
		for(let counter = 0; counter < question.length; counter++){
			const tempP = document.createElement('p');
			const tempQuestion = document.createElement('p');
			tempQuestion.innerHTML = (counter + 1) +") "+ question[counter];
			tempQuestion.className = "questionTrueOrFalseText-style";
			tempP.className = "questionP";
			tempP.innerHTML = (counter + 1);
			tempP.setAttribute('draggable', true);
			
			tempP.addEventListener("dragstart", this.dragStart);
			tempP.addEventListener("dragend", this.dragEnd);
			
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

		
		this.updateAttributes(mainDiv ,"questionTrueOrFalse-style", answer);
	},
	
	createSequenceQuestion: function(events, answer) {
		const mainDivSequence = document.createElement('div');
		const questionDiv = document.createElement('div');
		const eventDiv = document.createElement('div');
		const eventStartDiv = document.createElement('div');
		const eventTextDiv = document.createElement('div');
		const eventDropDiv = document.createElement('div');
		
		
		mainDivSequence.className = "questionSequence-style";
		questionDiv.className = "sequenceQuestionDiv-style";
		eventStartDiv.className = "eventStartDiv-style";
		eventTextDiv.className = "eventTextDiv-style";
		eventDropDiv.className = "eventDropDiv-style";

		const title = document.createElement('p');
		title.innerHTML = " Correctly rearrange the events from the most recent event to the oldest event.";
		title.className = "title-style";
		const toolTip = document.createElement('div');
		toolTip.innerHTML = "(How to answer?)";
		toolTip.className = "toolTipDiv";
		const toolTipText = document.createElement('span');
		toolTipText.innerHTML = "Drag the blue tile into the blue rectangle in from the most recent event to the oldest event.";
		toolTipText.className = "toolTipText";
		const labelDiv1 = document.createElement('div');
		const label1 = document.createElement('p');
		label1.innerHTML = "Most Recent Event";
		labelDiv1.appendChild(label1);
		labelDiv1.className = "labelDiv";
		label1.className = "label";
		
		const labelDiv2 = document.createElement('div');
		labelDiv2.className = "labelDiv";
		const label2 = document.createElement('p');
		labelDiv2.appendChild(label2);
		label2.innerHTML = "Oldest Event";
		label2.className = "label2";
		
		questionDiv.appendChild(title);
		questionDiv.appendChild(toolTip);
		questionDiv.appendChild(labelDiv1);
		toolTip.appendChild(toolTipText);
		
		for(let counter = 0; counter < events.length; counter++){
			const tempQuestion = document.createElement('p');
			tempQuestion.className = "eventTile";
			tempQuestion.innerHTML = events[counter];
			tempQuestion.setAttribute('draggable', true);
			
			tempQuestion.addEventListener("dragstart", this.dragStart);
			tempQuestion.addEventListener("dragend", this.dragEnd);
			
			eventTextDiv.appendChild(tempQuestion);
		}
		
		
		eventTextDiv.addEventListener("dragover", this.sequenceDragOver.bind(this));
		eventDropDiv.addEventListener("dragover", this.sequenceDragOver.bind(this));
		
		eventStartDiv.appendChild(eventTextDiv);
		eventStartDiv.appendChild(eventDropDiv);
		
		mainDivSequence.append(questionDiv);
		mainDivSequence.append(eventStartDiv);
		mainDivSequence.append(labelDiv2);
		
		this.updateAttributes(mainDivSequence ,"questionSequence-style", answer);
	},

	createFillInTheBlank: function(questions, answers) {
		const mainDivFill = document.createElement('div');
		const titleDiv = document.createElement('div');
		const questionMainDiv = document.createElement('div');
		
		
		mainDivFill.className = "questionFillInBlanks-style";
		// questionDiv.className = "sequenceQuestionDiv-style";

		const title = document.createElement('p');
		titleDiv.appendChild(title);
		title.innerHTML = "Fill in the Blank";
		title.className = "titleFill-style";
		
		for(let counter = 0; counter < questions.length; counter++){
			let questionDivided = questions[counter].split("___");
			let dividedText = document.createElement("p");
			dividedText.className = "questionText-style";
			for(let counter2 = 0; counter2 < questionDivided.length; counter2++){
				if(counter2 === 0){
					dividedText.innerHTML = (counter + 1) + ") ";
					dividedText.className = "questionText-style";
					dividedText.innerHTML = dividedText.innerHTML + questionDivided[counter2];
				}else{
					let inputBox = document.createElement("input");
					inputBox.className = "inputBox-style";
					dividedText.className = "questionText-style"
					dividedText.append(inputBox);
					dividedText.innerHTML += questionDivided[counter2]
				}
				questionMainDiv.append(dividedText);
				
			}
		}
	
		
		mainDivFill.append(titleDiv);
		mainDivFill.append(questionMainDiv);
		
		this.updateAttributes(mainDivFill ,"questionFillInBlank-style", answers);
	},

	
	gradeAnswers: function() {
		const questionToBeGraded = this.QuizBoxDiv.children;
		const boxesChangeColor = this.QuizBoxDiv.lastChild.children[0].children;
		let totalScore = 0;
		let totalQuestion = 0;
		for(let counter = 1; counter < questionToBeGraded.length; counter++){
			let tempScore = 0;
			if(this.questionObjects[counter - 1].typeQuestion ===  "questionMultipleChoiceOne-style"){ // multipleChoice question
				tempScore = this.gradeMultipleChoice(questionToBeGraded[counter].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}
				totalQuestion += 1;
			}else if(this.questionObjects[counter - 1].typeQuestion ===  "questionMultipleChoiceMany-style"){ // multipleChoice question many
				tempScore = this.gradeMultipleChoiceMany(questionToBeGraded[counter].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else if((tempScore > 0 && tempScore < this.questionObjects[counter].answersToQuestion.length) || tempScore === -1){
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
					if(tempScore === -1){
						tempScore = 0;
					}
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}
				totalQuestion += this.questionObjects[counter - 1].answersToQuestion.length;
			}else if(this.questionObjects[counter - 1].typeQuestion === "questionTrueOrFalse-style"){ // true or false question
				tempScore = this.gradeTrueOrFalse(questionToBeGraded[counter].children[3].children[0], questionToBeGraded[counter].children[3].children[1], this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === this.questionObjects[counter - 1].answersToQuestion.length){
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}else if (tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
				}
				totalQuestion += this.questionObjects[counter - 1].answersToQuestion.length;
			}else if(this.questionObjects[counter - 1].typeQuestion === "questionSequence-style"){
				tempScore = this.gradeSequence(questionToBeGraded[counter].children[1].children[1].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === this.questionObjects[counter - 1].answersToQuestion.length){
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}else if (tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
				}
				totalQuestion += this.questionObjects[counter - 1].answersToQuestion.length;
			}
			totalScore += tempScore;
		}
		this.isGraded = true;
		const finalScore = document.createElement('div');
		const finalScoreText = document.createElement('p');
		
		finalScoreText.innerHTML = totalScore + " / " + totalQuestion;
		finalScore.appendChild(finalScoreText);
		finalScoreText.className = "finalScoreText";
		
		finalScore.className = "finalScoreDiv";
		
		const divToAddTheFinalScore = this.QuizBoxDiv.lastChild.children[1];
		
		divToAddTheFinalScore.appendChild(finalScore);
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
	},
	
	gradeTrueOrFalse: function(falseChoices, trueChoices, answer) {
		let score = 0;
		let statementNum = 0;
		for(let counter = 0; counter < trueChoices.children.length; counter++){
			statementNum = trueChoices.children[counter].innerHTML;
			if(answer[parseInt(statementNum) - 1]){
				score += 1;
			}
		}
		for(let counter = 0; counter < falseChoices.children.length; counter++){
			statementNum = falseChoices.children[counter].innerHTML;
			if(answer[parseInt(statementNum) - 1] === false){
				score += 1;
			}
		}
		return score;
	},
	
	gradeSequence: function(events, answer) {
		let score = 0;
		console.log(events);
		for(let counter = 0; counter < events.length; counter++){
			let eventText = events[counter].innerHTML;
			if(eventText === answer[counter]){
				score += 1
			}	
		}
		return score;
	},
	
	
}


