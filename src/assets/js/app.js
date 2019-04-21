const questionsArr = [
  {
    question: "What was Gollum's name when he was one of the riverfolk?",
    possibleAnswers: ['Deagol', 'Deagen', 'Smeagol', 'Smeagen'],
    correctAnswer: 'Smeagol',
  },
  {
    question: "Who is Faramir's father?",
    possibleAnswers: ['Denethor', 'Boromir', 'Lord Elrond', 'Ecthelion'],
    correctAnswer: 'Denethor',
  },
  {
    question: 'By what name do the Elves call Gandalf?',
    possibleAnswers: [
      'The Grey Pilgrim',
      'Incanus',
      'Gandalf the Grey',
      'Mithrandir',
    ],
    correctAnswer: 'Mithrandir',
  },
  {
    question: "What is the name of Frodo's sword?",
    possibleAnswers: ['Thrasher', 'Sting', 'Dimholt', 'Stormbreaker'],
    correctAnswer: 'Sting',
  },
  {
    question:
      "What changed Arwen's mind about becoming mortal to be with Aragorn?",
    possibleAnswers: [
      'She knew she wanted to be queen',
      "She didn't want to sail to the Grey Havens",
      'She was doing it in spite of Elrond',
      'She saw a vision of her unborn son',
    ],
    correctAnswer: 'She saw a vision of her unborn son',
  },
];
let randomNum;
let questionTimer;
let questionResultsTimer;
let finalResultsTimer;
let newForm;
let percentageCalculated;
let correctTally = 0;
let incorrectTally = 0;
const questionElement = document.querySelector('#questionArea');
const answerElement = document.querySelector('#answersArea');
let questionsAnsweredArr = [];

document
  .querySelector('#beginQuestButton')
  .addEventListener('click', function() {
    // Hide button
    const startGameButton = document.querySelector('#beginQuestButton');
    startGameButton.classList.add('d-none');

    nextQuestion();
  });

function nextQuestion() {
  if (questionsArr.length === questionsAnsweredArr.length) {
    displayFinalScreen();
  } else {
    // Show Question & Answer fields
    document.querySelector('#questionJumbo').classList.remove('d-none');
    document.querySelector('#answersJumbo').classList.remove('d-none');
    // Generate random #
    randomNum = Math.floor(Math.random() * questionsArr.length);

    fillQuestion();
    fillAnswers();
    questionTimer = setTimeout(checkAnswer, 20000);
  }
}
function fillQuestion() {
  // Create span and insert random question
  const newSpan = document.createElement('span');
  newSpan.setAttribute('class', 'currentQuestion');
  newSpan.textContent = questionsArr[randomNum].question;
  // Add span to DOM
  questionElement.appendChild(newSpan);
}
function fillAnswers() {
  // Create form element
  newForm = document.createElement('form');
  newForm.setAttribute('onsubmit', 'checkAnswer()');
  newForm.setAttribute('class', 'answersAndSubmit');
  // Create div for submit
  const newDivSubmit = document.createElement('div');
  newDivSubmit.setAttribute('class', 'custom-control');
  // Create submit button
  const newButtonSubmit = document.createElement('button');
  newButtonSubmit.setAttribute('type', 'submit');
  newButtonSubmit.setAttribute('name', 'answers');
  newButtonSubmit.setAttribute('id', 'submitButton');
  newButtonSubmit.setAttribute('class', 'btn btn-warning');
  newButtonSubmit.textContent = 'Submit';
  // Add form and submit to DOM
  answerElement.appendChild(newForm);
  newForm.appendChild(newDivSubmit);
  newDivSubmit.appendChild(newButtonSubmit);

  for (let i = 0; i < questionsArr[randomNum].possibleAnswers.length; i++) {
    // Create div for radios
    const newDivRadio = document.createElement('div');
    newDivRadio.setAttribute('class', 'custom-control custom-radio');
    // Create radio buttons
    const newInputRadio = document.createElement('input');
    newInputRadio.setAttribute('type', 'radio');
    newInputRadio.setAttribute('name', 'answers');
    newInputRadio.setAttribute('value', [i]);
    newInputRadio.setAttribute('id', `radio${[i]}`);
    newInputRadio.setAttribute('class', 'custom-control-input');
    // Create radio label
    const newLabelAnswer = document.createElement('label');
    newLabelAnswer.setAttribute('value', [i]);
    newLabelAnswer.setAttribute('for', `radio${[i]}`);
    newLabelAnswer.setAttribute('class', 'custom-control-label');
    newLabelAnswer.textContent = questionsArr[randomNum].possibleAnswers[i];
    // Add radio buttons and answers before submit in DOM
    newForm.insertBefore(newDivRadio, newDivSubmit);
    newDivRadio.appendChild(newInputRadio);
    newDivRadio.appendChild(newLabelAnswer);
  }
}

function checkAnswer() {
  clearTimeout(questionTimer);

  const radioButtons = document.querySelectorAll('input[type=radio]');
  let value;
  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      value = radioButtons[i].value;
    }
  }

  const answerSelectedText = questionsArr[randomNum].possibleAnswers[value];
  const correctAnswerText = questionsArr[randomNum].correctAnswer;

  if (answerSelectedText === correctAnswerText) {
    congratulations();
  } else {
    noCigar();
  }

  // remove question from questionArr
  questionAnswered = questionsArr.slice(randomNum);
  questionsAnsweredArr.push(questionAnswered);

  questionResultsTimer = setTimeout(clearQuestionArea, 2500);
  setTimeout(() => {
    document.querySelector('.questionFeedback').remove();
    nextQuestion();
  }, 2500);

  // event.preventDefault();
}
function congratulations() {
  correctTally++;
  clearAnswersArea();
  document.querySelector('.currentQuestion').remove();
  const newCongratsSpan = document.createElement('span');
  newCongratsSpan.setAttribute('class', 'questionFeedback');
  newCongratsSpan.textContent = 'Correct!';
  questionElement.appendChild(newCongratsSpan);
}
function noCigar() {
  incorrectTally++;
  clearAnswersArea();
  document.querySelector('.currentQuestion').remove();
  const newNoCongratsSpan = document.createElement('span');
  newNoCongratsSpan.setAttribute('class', 'questionFeedback');
  newNoCongratsSpan.textContent = `Sorry ... the answer is "${
    questionsArr[randomNum].correctAnswer
  }".`;
  questionElement.appendChild(newNoCongratsSpan);
}
function clearQuestionArea() {
  document.querySelector('.currentQuestion').remove();
  document.querySelector('#questionJumbo').classList.add('d-none');
}
function clearAnswersArea() {
  document.querySelector('.answersAndSubmit').remove();
  document.querySelector('#answersJumbo').classList.add('d-none');
}
function timeOut() {
  noCigar();
  clearAnswersArea();
}
function percentageCalculator() {
  percentageCalculated = (correctTally / (correctTally + incorrectTally)) * 100;
}
function reset() {
  document.querySelector('#finalResults').remove();
  document.querySelector('#answersCorrect').remove();
  document.querySelector('#answersIncorrect').remove();
  document.querySelector('#percent').remove();
  document.querySelector('#replayGameButton').remove();
}
function displayFinalScreen() {
  percentageCalculator();

  const finalResultsBanner = document.querySelector('#questionArea');
  const finalResults = document.createElement('div');
  finalResults.setAttribute('id', 'finalResults');
  finalResults.textContent = `Final Results`;
  finalResultsBanner.appendChild(finalResults);

  document.querySelector('#answersJumbo').classList.remove('d-none');
  // Display number of correct and incorrect answers
  const answersCorrect = document.createElement('div');
  answersCorrect.setAttribute('id', 'answersCorrect');
  answersCorrect.textContent = `Number correct: ${correctTally}`;
  const answersIncorrect = document.createElement('div');
  answersIncorrect.setAttribute('id', 'answersIncorrect');
  answersIncorrect.textContent = `Number incorrect: ${incorrectTally}`;
  const percentageCorrect = document.createElement('div');
  percentageCorrect.setAttribute('id', 'percent');
  percentageCorrect.textContent = `You answered ${percentageCalculated}% correct`;

  // Restart game with play again button
  const replayGame = document.createElement('button');
  replayGame.setAttribute('class', 'btn btn-warning btn-block');
  replayGame.setAttribute('id', 'replayGameButton');
  replayGame.textContent = 'Play Again';

  const results = document.querySelector('#answersArea');
  results.appendChild(answersCorrect);
  results.appendChild(answersIncorrect);
  results.appendChild(percentageCorrect);
  results.appendChild(replayGame);

  document
    .querySelector('#replayGameButton')
    .addEventListener('click', function() {
      correctTally = 0;
      incorrectTally = 0;
      questionsAnsweredArr = [];
      reset();
      nextQuestion();
    });
}
