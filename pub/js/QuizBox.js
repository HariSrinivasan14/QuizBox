/* JS Libraries */
"use strict";


(function(global, document) { 



	function QuizBox(mainDiv) {

		this.currentQuestion = 0;
		this.numQuestions = 0;
		this.isGraded = false;
		this.QuizBoxDiv = document.createElement('div');
		this.QuizBoxDiv.className = "QuizBox-style";	
		mainDiv.append(this.QuizBoxDiv);
		_addNavigationButtons.bind(this)();
		this.userAnswers = []
		this.questionObjects = [];

	}



	function _handleClickPre(e) {
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
	}


	function _handleClickNext(e) {
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
	}


	function _handleClickChoiceOne(e) {
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
	}


	function _handleClickChoiceMany(e) {
		let parentDiv = e.target

		if(e.target.parentElement.className === "questionMultipleChoiceManyDivDefault-style" || e.target.parentElement.className === "questionMultipleChoiceManyDivBlue-style"){
			parentDiv = e.target.parentElement;
		}
		
		if(parentDiv.className === "questionMultipleChoiceManyDivDefault-style"){
				parentDiv.className = "questionMultipleChoiceManyDivBlue-style";
		}else if(parentDiv.className === "questionMultipleChoiceManyDivBlue-style"){
				parentDiv.className = "questionMultipleChoiceManyDivDefault-style";
		}
	}
	function _updateNav(newQuestionNum) {
		let updateSelect = this.QuizBoxDiv.children[0].children[1].children[0];
		let updateTotalQuestion = this.QuizBoxDiv.children[0].children[1].children[1];
		
		const tempOption = document.createElement("option");
		tempOption.value = newQuestionNum;
		tempOption.innerHTML = newQuestionNum;
		updateSelect.appendChild(tempOption);
		
		updateTotalQuestion.innerHTML = "of " + newQuestionNum;
	}
	function _changeQuestion(e) {
		
		this.questionObjects[this.currentQuestion].question.className = "displayNone";
		this.currentQuestion = e.target.value - 1;
		this.questionObjects[this.currentQuestion].question.className = this.questionObjects[this.currentQuestion].typeQuestion;
		if(this.isGraded){
			this.questionObjects[this.currentQuestion].question.className.classList.add('graded');
		}
		
	}

	function _addNavigationButtons() {
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
		
		questionList.addEventListener("change", _changeQuestion.bind(this));
		
		
		navigationDiv.appendChild(preButton);
		navigationDiv.appendChild(numQuestionDiv);
		navigationDiv.appendChild(nextButton);
		
		preButton.addEventListener('click', _handleClickPre.bind(this))
		nextButton.addEventListener('click', _handleClickNext.bind(this))

		this.QuizBoxDiv.appendChild(navigationDiv);

	}

	function _createSubmitPage(points) {
		const lastDiv = document.createElement('div');
		const lastDivQuestions = document.createElement('div');
		const lastDivSubmit = document.createElement('div');
		const submitButton = document.createElement('button');
		const questionBox = document.createElement('div');
		const questionTextBox = document.createElement('p');
		
		
		questionTextBox.innerHTML = "Q1: --/" + points;
		questionTextBox.className = "questionLastDivText"; 
		questionBox.appendChild(questionTextBox);
		questionBox.classList = "questionLastDiv";
		lastDivQuestions.className = "lastDivQuestion-style" 
		
		
		submitButton.innerHTML = "Submit";
		submitButton.className = "submitButton";
		
		submitButton.addEventListener('click', _gradeAnswers.bind(this));
		
		lastDivQuestions.appendChild(questionBox);
		lastDiv.appendChild(lastDivQuestions);
		
		lastDivSubmit.appendChild(submitButton);
		lastDivSubmit.className = "scoreAndSubmitDiv";
		lastDiv.appendChild(lastDivSubmit);
		
		lastDiv.className = "displayNone";
		
		const QuestionObject = {question: lastDiv, typeQuestion: "lastDiv-style", answersToQuestion: null};
		this.questionObjects.push(QuestionObject);
		
		
		this.QuizBoxDiv.append(lastDiv);

		_updateNav.bind(this)(this.numQuestions + 1);
		this.numQuestions += 1;
		
	}

	function _updateSubmitPage(questionNum, points) {
		const questionBox = document.createElement('div');
		const questionTextBox = document.createElement('p');
		
		
		questionTextBox.innerHTML = "Q" + questionNum + ": --/" + points;
		questionTextBox.className = "questionLastDivText"; 
		questionBox.appendChild(questionTextBox);
		questionBox.classList = "questionLastDiv";
		
		this.QuizBoxDiv.lastChild.children[0].appendChild(questionBox);
		
		
	}

	function _updateAttributes(div, divClassName, answers, points) {
		const QuestionObject = {question: div, typeQuestion: divClassName, answersToQuestion: answers};
		this.questionObjects.push(QuestionObject);
		this.userAnswers.push(undefined);

		if(this.numQuestions !== 0){
			QuestionObject.question.className = "displayNone";
			
			[this.questionObjects[this.questionObjects.length - 1], this.questionObjects[this.questionObjects.length - 2]] = [this.questionObjects[this.questionObjects.length - 2], this.questionObjects[this.questionObjects.length - 1]];
			
			this.QuizBoxDiv.insertBefore(div, this.QuizBoxDiv.lastChild);
			_updateSubmitPage.bind(this)(this.numQuestions, points);
			
		}else{
			QuestionObject.question.className = divClassName;
			
			this.QuizBoxDiv.appendChild(div);
			_createSubmitPage.bind(this)(points);
		}
		
		_updateNav.bind(this)(this.numQuestions + 1);
		this.numQuestions += 1;
	}


	function _dragStart(e){
		e.target.classList.add('draggingTile');
	}


	function _dragEnd(e){
		e.target.classList.remove('draggingTile');

	}


	function _trueOrFalseDragOver(e){
		e.preventDefault();
		const elementDragging = document.querySelector('.draggingTile');
		try{
			if(e.target.className === "trueDiv" || e.target.className === "falseDiv" || e.target.className === "startDiv"){
				e.target.appendChild(elementDragging);
			}
		}catch{
			return;
		}
	}
	function _getClosestElement(tileArray, cursorYPosition){
		return tileArray.reduce((closestTile, tileElement) => {
			const tileElementBounds = tileElement.getBoundingClientRect();
			const position = cursorYPosition - (tileElementBounds.height / 2) - tileElementBounds.top;
			if(position > closestTile.position && position < 0){
				return {tile: tileElement, position: position};
			}else{
				return closestTile;
			}
		}, {position: Number.NEGATIVE_INFINITY}).tile;
	}
	function _sequenceDragOver(e){
		e.preventDefault();
		const elementDragging = document.querySelector('.draggingTile');
		let notDraggingElementsNodeList = e.target.querySelectorAll('.eventTile:not(.draggingTile)');
		const notDraggingElements = [];
		for(let counter = 0; counter < notDraggingElementsNodeList.length; counter++ ){
			notDraggingElements.push(notDraggingElementsNodeList[counter]);
		}
		const closestElement = _getClosestElement(notDraggingElements, e.clientY);
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
	}

	function _updateScore(score, questionBox, questionNum){
		const totalScore = questionBox.children[0].innerHTML[7];
		questionBox.children[0].innerHTML = "Q" + questionNum + ": " + score  +" / " + totalScore;
	}
	
	function _gradeAnswers() {
		const questionToBeGraded = this.QuizBoxDiv.children;
		const boxesChangeColor = this.QuizBoxDiv.lastChild.children[0].children;
		let totalScore = 0;
		let totalQuestion = 0;
		for(let counter = 1; counter < questionToBeGraded.length; counter++){
			let tempScore = 0;
			if(this.questionObjects[counter - 1].typeQuestion ===  "questionMultipleChoiceOne-style"){ // multipleChoice question
				tempScore = _gradeMultipleChoice(questionToBeGraded[counter].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}
				totalQuestion += 1;
				_updateScore(tempScore, boxesChangeColor[counter - 1], counter);
			}else if(this.questionObjects[counter - 1].typeQuestion ===  "questionMultipleChoiceMany-style"){ // multipleChoice question many
				let tempScoreArray = _gradeMultipleChoiceMany(questionToBeGraded[counter].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScoreArray[0] <= 0 && tempScoreArray[1] === false){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
					tempScore = 0;
				}else if(tempScoreArray[0] === this.questionObjects[counter - 1].answersToQuestion.length){
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
					tempScore = tempScoreArray[0];
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
					if(tempScoreArray[0] < 0){
						tempScore = 0;
					}else{
						tempScore = tempScoreArray[0];
					}
				}
				totalQuestion += this.questionObjects[counter - 1].answersToQuestion.length;
				_updateScore(tempScore, boxesChangeColor[counter - 1], counter);
			}else if(this.questionObjects[counter - 1].typeQuestion === "questionTrueOrFalse-style"){ // true or false question
				tempScore = _gradeTrueOrFalse(questionToBeGraded[counter].children[3].children[0], questionToBeGraded[counter].children[3].children[1], this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === this.questionObjects[counter - 1].answersToQuestion.length){
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}else if (tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
				}
				totalQuestion += this.questionObjects[counter - 1].answersToQuestion.length;
				_updateScore(tempScore, boxesChangeColor[counter - 1], counter);
			}else if(this.questionObjects[counter - 1].typeQuestion === "questionSequence-style"){
				tempScore = _gradeSequence(questionToBeGraded[counter].children[1].children[1].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === this.questionObjects[counter - 1].answersToQuestion.length){
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}else if (tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
				}
				totalQuestion += this.questionObjects[counter - 1].answersToQuestion.length;
				_updateScore(tempScore, boxesChangeColor[counter - 1], counter);
			}else if(this.questionObjects[counter - 1].typeQuestion === "questionFillInBlank-style"){
				tempScore = _gradeFillInBlank(questionToBeGraded[counter].children[1].children, this.questionObjects[counter - 1].answersToQuestion);
				if(tempScore === this.questionObjects[counter - 1].answersToQuestion.length){
					boxesChangeColor[counter - 1].className = "questionLastDivCorrect";
				}else if (tempScore === 0){
					boxesChangeColor[counter - 1].className = "questionLastDivIncorrect";
				}else{
					boxesChangeColor[counter - 1].className = "questionLastDivPartialCorrect";
				}
				_updateScore(tempScore, boxesChangeColor[counter - 1], counter);
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
	}
	
	function _gradeMultipleChoice(optionsToBeGraded, answer) {
		
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
	}
	
	
	function _gradeMultipleChoiceMany(optionsToBeGraded, answer) {
		let score = 0;
		let answerCorrect = false;
		for(let optionCounter = 1; optionCounter < optionsToBeGraded.length; optionCounter++){
			let tempOption = optionsToBeGraded[optionCounter];
			if(tempOption.className === "questionMultipleChoiceManyDivBlue-style"){
				if(answer.indexOf(tempOption.children[0].innerHTML) >= 0){
					answerCorrect = true;
					score += 1
				}else{
					score -= 1; // user picks more options 
				}
			}
		}
		return [score, answerCorrect];
	}
	
	function _gradeTrueOrFalse(falseChoices, trueChoices, answer) {
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
	}
	
	function _gradeSequence(events, answer) {
		let score = 0;
		for(let counter = 0; counter < events.length; counter++){
			let eventText = events[counter].innerHTML;
			if(eventText === answer[counter]){
				score += 1
			}	
		}
		return score;
	}
	
	function _gradeFillInBlank(questions, answer) {
		let score = 0;
		for(let counter = 0; counter < questions.length; counter++){
			let boxesArr = Array.from(questions[counter].querySelectorAll('.inputBox-style'));
			for(let counter2 = 0; counter2 < boxesArr.length; counter2++){
				console.log(boxesArr[counter2].value);
				if (boxesArr[counter2].value.toLowerCase() === answer[counter + counter2].toLowerCase()){
					score += 1
				}
			}
		}
		return score;
	}

	function _handleMatchClick(e){
		if(e.target.classList.contains('matched-style')){
			let tempArr = this.userAnswers[this.currentQuestion];
			for(let removeIndex = 0; removeIndex < tempArr.length; removeIndex++){
				if(tempArr[removeIndex][0].innerHTML === e.target.innerHTML || tempArr[removeIndex][1].innerHTML === e.target.innerHTML){
					tempArr[removeIndex][0].classList.remove('matched-style');
					tempArr[removeIndex][1].classList.remove('matched-style');
					[tempArr[removeIndex], tempArr[tempArr.length - 1]] = [tempArr[tempArr.length - 1], tempArr[removeIndex]]
					tempArr.pop();
					return;
				}
			}
		}

		//new choice
		if(e.target.classList.contains('matchTile1Selected-style')){
			e.target.classList.remove('matchTile1Selected-style');

		}else if(e.target.className === "matchTile1-style"){
			const childArr = e.target.parentElement.children;
			for(let counter = 0; counter < childArr.length; counter++){
				if(!(childArr[counter].classList.contains('matched-style'))){
					childArr[counter].className = "matchTile1-style"
				}	
			}
			e.target.classList.add('matchTile1Selected-style');
		}


		if(e.target.classList.contains('matchTile2Selected-style')){
			e.target.classList.remove('matchTile2Selected-style');

		}else if(e.target.className === "matchTile2-style"){
			const childArr = e.target.parentElement.children;
			for(let counter = 0; counter < childArr.length; counter++){
				if(!(childArr[counter].classList.contains('matched-style'))){
					childArr[counter].className = "matchTile2-style"
				}	
			}
			e.target.classList.add('matchTile2Selected-style');
		}
		const leftChoices = e.target.parentElement.parentElement.children[0].children;
		const rightChoices = e.target.parentElement.parentElement.children[1].children;
		let leftIndex = null;
		for(let child1 = 0; child1 < leftChoices.length; child1++){
			if(leftChoices[child1].classList.contains('matchTile1Selected-style')){
				leftIndex = child1;
			}

		}
		for(let child = 0; child < rightChoices.length; child++){
			if(rightChoices[child].classList.contains('matchTile2Selected-style') && leftIndex !== null){
				if(this.userAnswers[this.currentQuestion] === undefined){
					this.userAnswers[this.currentQuestion] = []
				}
				this.userAnswers[this.currentQuestion].push([leftChoices[leftIndex], rightChoices[child]]);
				leftChoices[leftIndex].classList.remove('matchTile1Selected-style');
				rightChoices[child].classList.remove('matchTile2Selected-style');
				leftChoices[leftIndex].classList.add("matched-style");
				rightChoices[child].classList.add("matched-style");
			}

		}
	}

QuizBox.prototype = {

	
	createMultipleChoiceOne: function(question, options, answer) {
		const questionMultipleOne = document.createElement('div');
		const questionText = document.createElement('p');
		
		questionText.appendChild(document.createTextNode(question));
		questionText.className = "questionMultipleChoiceOneText-style";
		questionMultipleOne.appendChild(questionText);
		
		for(let counter = 0; counter < options.length; counter++){
			const tempButton = document.createElement('button');
			const tempSpan = document.createElement('span');
			tempSpan.innerHTML = options[counter];
			tempSpan.className = "questionMultipleChoiceOneSpan";
			tempButton.appendChild(tempSpan);
			tempButton.addEventListener('click', _handleClickChoiceOne)
			tempButton.className = "questionMultipleChoiceOneDivDefault-style";
			questionMultipleOne.appendChild(tempButton);
			
		}
		
		_updateAttributes.bind(this)(questionMultipleOne ,"questionMultipleChoiceOne-style", answer, 1);
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
			tempButton.addEventListener('click', _handleClickChoiceMany)
			tempButton.className = "questionMultipleChoiceManyDivDefault-style";
			questionMultipleMany.appendChild(tempButton);
			
		}

		_updateAttributes.bind(this)(questionMultipleMany ,"questionMultipleChoiceMany-style", answer, answer.length);
		return;
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
		toolTipText.innerHTML = "Drag the blue tiles into green box if the statement is true. Otherwise drag the tile into the red box. Note 1 refers to question 1, 2 refers to question 2, etc.";
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
			
			tempP.addEventListener("dragstart", _dragStart);
			tempP.addEventListener("dragend", _dragEnd);
			
			questionDiv.appendChild(tempQuestion);
			startDiv.appendChild(tempP);
		}
		
		startDiv.addEventListener("dragover", _trueOrFalseDragOver);
		falseDiv.addEventListener("dragover", _trueOrFalseDragOver);
		trueDiv.addEventListener("dragover", _trueOrFalseDragOver);
		
		
		interactDiv.appendChild(falseDiv);
		interactDiv.appendChild(trueDiv);
		mainDiv.appendChild(questionDiv);
		mainDiv.appendChild(startDiv);
		mainDiv.appendChild(interactDiv);

		
		_updateAttributes.bind(this)(mainDiv ,"questionTrueOrFalse-style", answer, answer.length);
	},
	
	createSequenceQuestion: function(events, answer) {
		const mainDivSequence = document.createElement('div');
		const questionDiv = document.createElement('div');
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
			
			tempQuestion.addEventListener("dragstart", _dragStart);
			tempQuestion.addEventListener("dragend", _dragEnd);
			
			eventTextDiv.appendChild(tempQuestion);
		}
		
		
		eventTextDiv.addEventListener("dragover", _sequenceDragOver.bind(this));
		eventDropDiv.addEventListener("dragover", _sequenceDragOver.bind(this));
		
		eventStartDiv.appendChild(eventTextDiv);
		eventStartDiv.appendChild(eventDropDiv);
		
		mainDivSequence.append(questionDiv);
		mainDivSequence.append(eventStartDiv);
		mainDivSequence.append(labelDiv2);
		
		_updateAttributes.bind(this)(mainDivSequence ,"questionSequence-style", answer, answer.length);
	},

	createFillInTheBlank: function(questions, answers) {
		const mainDivFill = document.createElement('div');
		const titleDiv = document.createElement('div');
		const questionMainDiv = document.createElement('div');
		
		
		mainDivFill.className = "questionFillInBlanks-style";

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
		
		_updateAttributes.bind(this)(mainDivFill ,"questionFillInBlank-style", answers, answers.length);
	},

	

	createMatching: function(match1, match2, answer) {
		const mainDivMatching = document.createElement('div');
		const titleDiv = document.createElement('div');
		const questionMainDiv = document.createElement('div');
		
		mainDivMatching.className = "questionMatching-style";
		
		const title = document.createElement('p');
		titleDiv.appendChild(title);
		title.innerHTML = "Matching";
		title.className = "titleMatching-style";
		const match1Div = document.createElement('div');
		match1Div.className ="matchTile1Div";

		const toolTip = document.createElement('div');
		toolTip.innerHTML = "(How to answer?)";
		toolTip.className = "toolTipDiv";
		const toolTipText = document.createElement('span');
		toolTipText.innerHTML = "To match, Click on a tile from the left column, then click on a tile from the right column. To unmatch two tiles, click on one of the two tiles.";
		toolTipText.className = "toolTipText";
		toolTip.appendChild(toolTipText);
		titleDiv.appendChild(toolTip);

		for(let counter = 0; counter < match1.length; counter++){
			const matchQuestion = document.createElement('p');
			matchQuestion.className = "matchTile1-style";
			matchQuestion.innerHTML = match1[counter];
			match1Div.append(matchQuestion);
			matchQuestion.addEventListener("click", _handleMatchClick.bind(this));
		}

		const match2Div = document.createElement('div');
		match2Div.className ="matchTile2Div";
		for(let counter = 0; counter < match2.length; counter++){
			const matchQuestion = document.createElement('p');
			matchQuestion.className = "matchTile2-style";
			matchQuestion.innerHTML = match2[counter];
			match2Div.append(matchQuestion);
			matchQuestion.addEventListener("click", _handleMatchClick.bind(this));
		}
		questionMainDiv.append(match1Div);
		questionMainDiv.append(match2Div);

		mainDivMatching.append(titleDiv);
		mainDivMatching.append(questionMainDiv);
		_updateAttributes.bind(this)(mainDivMatching ,"questionMatching-style", answer, answer.length);
		return;
	},

}

global.QuizBox = global.QuizBox || QuizBox

})(window, window.document);
