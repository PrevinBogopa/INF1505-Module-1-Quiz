//1. start the game
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restart = document.getElementById('restart-btn');
const qBox = document.getElementById('questionBox');
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('answer-btns');
const markBoard = document.getElementById('total');
const right = document.getElementById('correctSign');
const wrong = document.getElementById('wrongSign');
const result = document.getElementsByClassName("result");
const marks = document.getElementById('disMarks');
const explanationElement = document.getElementById('explanation');
let shuffledQuestions, shuffledOptions, currentQuestionIndex;
let count = 0;
let quizEnded = false;
startButton.addEventListener('click', startGame);
restart.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQ();
})

function startGame() {
  startButton.classList.add('hide');
  result[0].classList.add('hide');
  shuffledQuestions = questionList.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  count = 0;
  markBoard.innerText = count + "/" + shuffledQuestions.length;
  qBox.classList.remove('hide');
  setNextQ()
}

//2. setting new question
function setNextQ() {
  resetState();
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}
function resetExplanation() {
  const explanation = document.getElementById('explanation');
  explanation.textContent = '';
}
function showQuestion(obj) {
  resetExplanation();
  questionElement.innerText = "Q" + (currentQuestionIndex + 1) + ". " + obj.question;
 
  shuffledOptions = obj.answers.sort(() => Math.random() - .5);
  for (let i = 0; i < shuffledOptions.length; i++) {
    const button = document.createElement('button');
    button.innerText = shuffledOptions[i].text;
    button.classList.add('btn');
    if (shuffledOptions[i].correct) {
      button.dataset.correct = shuffledOptions[i].correct;
    }
    button.addEventListener('click', selectAnswer);
    answerElement.appendChild(button);
  }
}
function endGame() {
  quizEnded = true;
  qBox.classList.add('hide');
  result[0].classList.remove('hide');
  marks.innerText = count + "/" + shuffledQuestions.length;
  if (count == shuffledQuestions.length) {
    result[0].innerText = "Congratulations! You scored " + count + " out of " + shuffledQuestions.length;
  } else {
    result[0].innerText = "You scored " + count + " out of " + shuffledQuestions.length + ". Better luck next time!";
  }
}


function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerElement.firstChild) {
    answerElement.removeChild(answerElement.firstChild);
  }
  right.classList.add('hide');
  wrong.classList.add('hide');
}

//3.action after selecting the question (correct/wrong)
function selectAnswer(e) {
  const selectedButton = e.target;
  selectedButton.style.border = "2px solid black";
  const correct = selectedButton.dataset.correct;
  countMarks(correct);
  setStatusClass(document.body, correct);
  Array.from(answerElement.children).forEach(btn => {
    setStatusClass(btn, btn.dataset.correct);
  })
  block();
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    endGame();
  }
  
  // Display explanation for wrong answers
  const obj = shuffledQuestions[currentQuestionIndex];
  if (!correct) {
    explanationElement.innerText = "Explanation: " + obj.explanation;
  }
}


function setStatusClass(ele, correct) {
  clearStatusClass(ele);
  if (correct) {
    ele.classList.add('correct');
  } else {
    ele.classList.add('wrong');
  }
}

function clearStatusClass(ele) {
  ele.classList.remove('correct');
  ele.classList.remove('wrong');
}

//counting score
function block() {
  Array.from(answerElement.children).forEach(btn => {
    btn.disabled = true;
  })
}

function countMarks(ele) {
  if (ele) {
    count++;
    right.classList.remove('hide');
  } else {
    wrong.classList.remove('hide');
  }
  markBoard.innerText = count + "/" + shuffledQuestions.length
}

function setNextQ() {
  resetState();
  if (quizEnded) {
    return;
  }
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
  } else {
    endGame();
  }
}

//Question list
const questionList= [
 
 {
    question:"A point-of-sale system is used by organizations ____________________. ",
    answers: [
      {text:'A. To reduce cost and gain a competative advantage in market place', correct:true},
      {text:'C. To impress the clients', correct:false },
      {text:'D. To impress the manager and grow the business', correct:false },
      {text:'B. To limit and reduce the number of people working', correct:false },
    ],
    explanation:"See in the textbook,module 1 section 1.1. \nOrganizations use computers and information systems to reduce costs and gain competative advantage in the market place."
  },
  {
    question:"Which of the following can be uses of a POS sytem in organization \n A. in learning institutions to Grade your exam answers and generate detailed reports \n B. POS system in grocery store to speed up service by reading universal product codes (UPC's)\n C. in Banks to generate your monthly statements and other bank activities. \n D. To manage store inventory ",
    answers: [
      {text:'All of the above', correct:true},
      {text:'Only A,B,C', correct:false },
      {text:'Only A n C', correct:false },
      {text:'Only A only', correct:false },
    ],
    explanation:"Read \'Computers and information systems in Daily Life\' case study to learn about the uses of POS in organizations",
  },
  {
    question:"Social networking sites can also be used to give customers up-to-date information",
    answers: [
      {text:'True', correct:true},
      {text:'False', correct:false },
 
    ],
    explanation:">;",
  },

  {
    question:"Youtube is the most popular video sharing social site",
    answers: [
      {text:'True', correct:true},
      {text:'False', correct:false },
 
    ],
    explanation:"Youtube is the most Popular Video sharing site",
  },
  {
    question:"the major reason for using Transaction-processing-systems (TPS\'s) is?",
    answers: [
      {text:'A. Attract customers', correct:false},
      {text:'B. Change state of business', correct:false },
      {text:'C.Keep up with the advancing technology trends', correct:false },
      {text:'B. Cost reduction', correct:true },
    ],
    explanation:"TPS's focuses on data collection and processing;the major reason for using them being cost reduction",
  },
  {
    question:"Computer literacy involves knowing",
    answers: [
      {text:'A. Databases,spreadsheets ,presentatiton softwares , the internet and collaboration tools and technologies ', correct:true},
      {text:'B. smartphones only', correct:false },
      {text:'C. Skills of how business computers are being used', correct:false },
      {text:'B. Business intelligence', correct:false },
    ],
    explanation:"A check defination of computer literacy",
  },
  {
    question:"Which of the following is part of Information literacy",
    answers: [
      {text:'A. Databases', correct:false},
      {text:'B. smartphones', correct:false },
      {text:'C. Skills', correct:false },
      {text:'B. Business intelligence', correct:true },
    ],
    explanation:"Information literacy is understanding the role of information in generating and using business intelligence",
  },
  {
    question:"Computer literacy  is \n understanding the role of information in generating and using busing intelligence",
    answers: [
      {text:'False',correct:true},
      {text:'True', correct:false },],
      explanation:"That is the defination of Information literacy",
  },
  {
    question:"TPS's are Transaction-processing systems\n The focus on data collection and processing the major reason for using them is cost reduction",
    answers: [
      {text:'True',correct:true},
      {text:'False', correct:false },],
      explanation:"That is the defination of TPS\'s",
  },

]

