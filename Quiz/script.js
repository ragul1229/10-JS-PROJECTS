const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false }
    ]
  },
  {
    question: "Who wrote 'Harry Potter'?",
    answers: [
      { text: "J.K. Rowling", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "William Shakespeare", correct: false },
      { text: "Agatha Christie", correct: false }
    ]
  }
];

const questionContainer = document.getElementById("question-container");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const result = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  result.innerText = "";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer) {
  const correct = answer.correct;
  if (correct) {
    score++;
  }
  Array.from(answerButtons.children).forEach(button => {
    if (questions[currentQuestionIndex].answers.find(a => a.text === button.innerText).correct) {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showResult() {
  resetState();
  questionContainer.innerText = `You scored ${score} out of ${questions.length}! 🎉`;
  result.innerHTML = `<button onclick="startQuiz()">Play Again</button>`;
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

nextButton.addEventListener("click", () => {
  handleNextButton();
});

startQuiz();
