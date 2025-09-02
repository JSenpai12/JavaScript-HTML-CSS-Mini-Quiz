let htmlMainBox = document.querySelector('.main-box');
let backUpMainBox = htmlMainBox.innerHTML;
let quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    choices: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars"
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks and Text Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "Which is the smallest prime number?",
    choices: ["0", "1", "2", "3"],
    answer: "2"
  },
  {
    question: "What does CPU stand for?",
    choices: ["Central Processing Unit", "Computer Personal Unit", "Central Performance Utility", "Control Program Unit"],
    answer: "Central Processing Unit"
  },
  {
    question: "Which language is primarily used for web development?",
    choices: ["Python", "JavaScript", "C++", "Ruby"],
    answer: "JavaScript"
  },
  {
    question: "Which country invented paper?",
    choices: ["Egypt", "China", "Greece", "India"],
    answer: "China"
  },
  {
    question: "What symbol is used to write an ID selector in CSS?",
    choices: [". (dot)", "# (hash)", "* (asterisk)", "& (ampersand)"],
    answer: "# (hash)"
  },
  {
    question: "Which gas do humans need to survive?",
    choices: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answer: "Oxygen"
  },
  {
    question: "Which data structure uses FIFO (First In, First Out)?",
    choices: ["Stack", "Queue", "Array", "Tree"],
    answer: "Queue"
  }
];
let score = 0;
let TotalQuestions = quizQuestions.length;
let skipped = [];


document.querySelector('.main-box').addEventListener('click', (e) => {
  if (e.target.classList.contains('choice-a')) {
    let answerA = e.target.innerText.replace("A. ", "");
    evaluateAnswer(answerA);
  }
  if (e.target.classList.contains('choice-b')) {
    let answerB = e.target.innerText.replace("B. ", "");
    evaluateAnswer(answerB);
  }
  if (e.target.classList.contains('choice-c')) {
    let answerC = e.target.innerText.replace("C. ", "");
    evaluateAnswer(answerC);
  }
  if (e.target.classList.contains('choice-d')) {
    let answerD = e.target.innerText.replace("D. ", "");
    evaluateAnswer(answerD);
  }
}); 

document.querySelector('.bottom-box').addEventListener('click', (e) => {
  if (e.target.classList.contains('skip-btn')) {
      skipFunction();
      console.log('Next Test');
  }

  if (e.target.classList.contains('back-btn')) {
    backFunction();
  }
});

let firstQuestion = randomizedQuestions(quizQuestions);

function randomizedQuestions(question) {
    const index = Math.floor(Math.random() * quizQuestions.length);
    return {
      question: question[index],
      Index: index
    };
}

function displayQuestion() {
  updateProgressBar();

    if (quizQuestions.length < 1 && skipped.length > 0) {
      quizQuestions = skipped;
      htmlMainBox.innerHTML = '';
      document.querySelector('.main-box').innerHTML = backUpMainBox;
      firstQuestion = randomizedQuestions(quizQuestions);
      displayQuestion();
    }
    
    if (quizQuestions.length < 1) {
      totalScoreDisplay();
    }

    let display_question = document.querySelector('.the-question');
    let choiceA = document.querySelector('.choice-a');
    let choiceB = document.querySelector('.choice-b');
    let choiceC = document.querySelector('.choice-c');
    let choiceD = document.querySelector('.choice-d');

    display_question.innerText = firstQuestion.question.question;
    choiceA.innerText = `A. ${firstQuestion.question.choices[0]}`;
    choiceB.innerText = `B. ${firstQuestion.question.choices[1]}`;
    choiceC.innerText = `C. ${firstQuestion.question.choices[2]}`;
    choiceD.innerText = `D. ${firstQuestion.question.choices[3]}`;
};

function evaluateAnswer(answer) {
    let correct_answer = firstQuestion.question.answer;
    if (answer === correct_answer) {
        score ++;
        quizQuestions.splice(firstQuestion.Index, 1);
        console.log(`Quiz Length: `,quizQuestions.length);

        correctDisplay()

          setTimeout(() => {
            document.querySelector('.main-box').innerHTML = backUpMainBox;
            firstQuestion = randomizedQuestions(quizQuestions);
            displayQuestion();
        }, 1000);
    } else {
        wrongDisplay();
        quizQuestions.splice(firstQuestion.Index, 1);
        console.log(`Quiz Length: `, quizQuestions.length);
        setTimeout(() => {
          document.querySelector('.main-box').innerHTML = backUpMainBox;
          firstQuestion = randomizedQuestions(quizQuestions);
          displayQuestion();
        }, 1000);
    }
};


// I Mess you bhai

function correctDisplay() {
  htmlMainBox.innerHTML = '';
  htmlMainBox.innerHTML += `
  <div class="correct-container">
      <div class="correct-display">
          <img src="check.png" class="check-img"/>
          <p class="correct-msg">Correct Answer!</p>
      </div>
  </div>
  `;
}

function wrongDisplay() {
  htmlMainBox.innerHTML = '';
  htmlMainBox.innerHTML += `
  <div class="correct-container">
      <div class="correct-display">
          <img src="delete.png" class="check-img"/>
          <p class="correct-msg">Wrong Answer.</p>
      </div>
  </div>
  `;
}

function totalScoreDisplay() {
  htmlMainBox.innerHTML = ''
  htmlMainBox.innerHTML += `
  <div class = "total-score-container">
      <p class="total-msg">Total Score: ${score} Out of 10</p>
      <img src="party-popper.png" class="score-img">
      <button class="quiz-again-btn">Quiz Again</button>
  </div>
  `;
  let playAgainBtn = document.querySelector('.quiz-again-btn');
  playAgainBtn.addEventListener('click', ()=> {
    location.reload();
  });
};

function updateProgressBar() {
  let progressBar = document.querySelector('.progress-bar');
  let progressInfo = document.querySelector('.progress-info');
  let progress = (Number(score) / TotalQuestions) * 100;
  progressBar.style.width = progress + "%"; 
  progressInfo.innerText = `${Math.floor(progress)}% complete`;
}

function skipFunction() {
  skipped.push(firstQuestion.question);
  quizQuestions.splice(firstQuestion.Index, 1);
  htmlMainBox.innerHTML = '';
  document.querySelector('.main-box').innerHTML = backUpMainBox;
  firstQuestion = randomizedQuestions(quizQuestions);
  displayQuestion();
  console.log(skipped.length);
};


function backFunction() {
  if (skipped.length) {
    firstQuestion.question = skipped.pop();
    htmlMainBox.innerHTML = ''
    document.querySelector('.main-box').innerHTML = backUpMainBox;
    displayQuestion();
  } else {
    console.log('none');
  }
  
};


displayQuestion();

// Ngano Mani Oiee T___T