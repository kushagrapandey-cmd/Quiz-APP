document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const progressBar = document.getElementById("progress-bar");
  const timeLeftDisplay = document.getElementById("time-left");


  let timerInterval;
  let timeLeft = 10;

  let questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;
  let answeredCorrectlyFlags = [];

  startBtn.addEventListener("click", startQuiz);

  nextBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    answeredCorrectlyFlags = [];
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    shuffleArray(questions); // shuffle questions
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = "";
    answeredCorrectlyFlags[currentQuestionIndex] = false;

    // update progress bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // start/reset timer
    timeLeft = 10;
    timeLeftDisplay.textContent = timeLeft;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timeLeft--;
      timeLeftDisplay.textContent = timeLeft;
      if (timeLeft === 0) {
        clearInterval(timerInterval);
        nextBtn.classList.remove("hidden");
        disableOptions(); // prevent more selection
      }
    }, 1000);

    // shuffle options
    let choices = [...questions[currentQuestionIndex].choices];
    shuffleArray(choices);

    choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;

      li.addEventListener("click", () => {
        const allOptions = document.querySelectorAll("li");
        allOptions.forEach((option) => option.classList.remove("li-select"));

        li.classList.add("li-select");

        const correctAnswer = questions[currentQuestionIndex].answer;
        const wasCorrect = answeredCorrectlyFlags[currentQuestionIndex];

        if (choice === correctAnswer && !wasCorrect) {
          score++;
          
          answeredCorrectlyFlags[currentQuestionIndex] = true;
        } else if (choice !== correctAnswer && wasCorrect) {
          score--;
          
          answeredCorrectlyFlags[currentQuestionIndex] = false;
        } else {
         
        }

        nextBtn.classList.remove("hidden");
      });

      choicesList.appendChild(li);
    });
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
    progressBar.style.width = `100%`;
    clearInterval(timerInterval);
  }

  function disableOptions() {
    const allOptions = document.querySelectorAll("li");
    allOptions.forEach((option) => {
      option.style.pointerEvents = "none";
    });
  }

  // Utility function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});
