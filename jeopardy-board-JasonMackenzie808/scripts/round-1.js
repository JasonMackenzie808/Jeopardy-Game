// Do not change the import statement
// import placeholderQuestions from "./placeholder-questions.js";
// console.log({ placeholderQuestions });




async function fetchJeopardyQuestions() {
  const url = "https://jarchive-json.glitch.me//game/10/18/2022"
  let category1Questions = [];
  let category2Questions = [];
  let category3Questions = [];
  let category4Questions = [];
  let category5Questions = [];
  let category6Questions = [];
  try {
    let response = await fetch(url);
    let data = await response.json();
    let placeholderQuestions = data.jeopardy
    placeholderQuestions.forEach((question) => {
      if (question.category === "5-LETTER PLACES") {
        category1Questions.push(question);
      } else if (question.category === "CELEBRITIES") {
        category2Questions.push(question);
      } else if (question.category === "AMERICANA") {
        category3Questions.push(question);
      } else if (question.category === "____ & ____") {
        category4Questions.push(question);
      } else if (question.category === "ASTRONOMY") {
        category5Questions.push(question);
      } else if (question.category === "\"LEFT\", \"RIGHT\" OR \"CENTER\"") {
        category6Questions.push(question);
      }
    });

    const questionSets = {
       category1: category1Questions,
       category2: category2Questions,
       category3: category3Questions,
       category4: category4Questions,
       category5: category5Questions,
       category6: category6Questions, 
    }
    return questionSets;
  } catch (error) {
    console.error(error);
  }
}

const placeholderQuestions = await fetchJeopardyQuestions();
console.log(placeholderQuestions);

let category1Questions =  placeholderQuestions.category1;
let category2Questions =  placeholderQuestions.category2;
let category3Questions =  placeholderQuestions.category3;
let category4Questions =  placeholderQuestions.category4;
let category5Questions =  placeholderQuestions.category5;
let category6Questions =  placeholderQuestions.category6;



console.log("it's working from round-1");

// Buttons
let answerForm = document.getElementById("answer-form");

let playerInput = document.getElementById("player-input");

let guessButton = document.getElementById("guess-btn");

let passButton = document.getElementById("pass-btn");

//Get passed data from landing page
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

let player1Name = urlParams.get("player1")
let player2Name = urlParams.get("player2")

// Player Name Display
let playerTurn = document.getElementById("player-turn");
let currentPlayerTurn = 1;

playerTurn.textContent = player1Name;
//Round 1 Next Page Button
let nextRoundButton1 = document.getElementById("next-round-btn1");

nextRoundButton1.addEventListener("click", () => {
  document.location = `./round-2.html?round=2&player1=${player1Name}&player2=${player2Name}&player1score=${player1CurrentScore}&player2score=${player2CurrentScore}&playerturn=${currentPlayerTurn}`;
});

// Setting Initial Player Scores
let player1CurrentScore = 0;
let player2CurrentScore = 0;

let player1ScoreMessage = document.getElementById("player1-score");
let player2ScoreMessage = document.getElementById("player2-score");

player1ScoreMessage.textContent = `Player 1 Score: ${player1CurrentScore}`;
player2ScoreMessage.textContent = `Player 2 Score: ${player2CurrentScore}`;

// Randomize Functions

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

let randomNumber;
function getRandomizedArray(array) {
  let randomOrder = [];
  let i = 0;
  while (i < array.length) {
    randomNumber = getRandomNumber(0, array.length);
    if (randomOrder.includes(array[randomNumber]) === false) {
      randomOrder.push(array[randomNumber]);
      i++;
    }
  }
  return randomOrder;
}

function getRandomQuestion(questions) {
  for (let i = 0; i < questions.length; i++) {
    return questions[i].clue;
  }
}

function getAnswerToRandomQuestion(questions) {
  for (let i = 0; i < questions.length; i++) {
    return questions[i].answer;
  }
}

// Cards & Questions
let modal = document.getElementById("modal");

let question = document.getElementById("question");

let cards = document.querySelectorAll(".value");

let cat1 = document.querySelectorAll(".cat-1");

let cat2 = document.querySelectorAll(".cat-2");

let cat3 = document.querySelectorAll(".cat-3");

let cat4 = document.querySelectorAll(".cat-4");

let cat5 = document.querySelectorAll(".cat-5");

let cat6 = document.querySelectorAll(".cat-6");

// Declare a Current Question Value Variable
let questionValue;

// Add a variable to delay cell click event listener if player guessed correctly
let playerAnsweredCorrectly = false;

// Declare Question Round
let questionRoundOver = true;

// Declare a Count to Keep Track of Board
let count = 0;

// Check Count & Score Functions

function checkCount() {
  if (count >= 30) {
    window.alert(`Continue to the next round.`);
    nextRoundButton1.disabled = false;
  }
}

function checkScores() {
  if (
    parseInt(player1CurrentScore) >= 15000 ||
    parseInt(player2CurrentScore) >= 15000
  ) {
    cards.forEach((cell) => {
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
    });

    window.alert(`Continue to the next round.`);
    nextRoundButton1.disabled = false;
  }
}

//Category 1
let questionAnswer = "";
let randomizedCat1Array =  getRandomizedArray(category1Questions.slice(0, 5));
let category1Index = 0;
cat1.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (questionRoundOver === true) {
      console.log(category1Index);
      count += 1;
      modal.classList.remove("hidden");
      console.log(randomizedCat1Array);
      question.textContent = randomizedCat1Array[category1Index].clue;
      questionAnswer = randomizedCat1Array[category1Index].answer;
      console.log(questionAnswer);
      questionValue = cell.textContent;
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
      guessButton.disabled = false;
      passButton.disabled = false;
      questionRoundOver = false;
      category1Index += 1;
    } else if (playerAnsweredCorrectly === true) {
      window.alert(`Please wait.`);
    } else {
      window.alert(`Please answer the question or pass.`);
    }
  });
});
//Category 2
let randomizedCat2Array =  getRandomizedArray(category2Questions.slice(0, 5));
let category2Index = 0;
cat2.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (questionRoundOver === true) {
      count += 1;
      modal.classList.remove("hidden");
      question.textContent = randomizedCat2Array[category2Index].clue;
      questionAnswer = randomizedCat2Array[category2Index].answer;
      console.log(questionAnswer);
      questionValue = cell.textContent;
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
      guessButton.disabled = false;
      passButton.disabled = false;
      questionRoundOver = false;
      category2Index += 1;
    } else if (playerAnsweredCorrectly === true) {
      window.alert(`Please wait.`);
    } else {
      window.alert(`Please answer the question or pass.`);
    }
  });
});
// Category 3
let randomizedCat3Array =  getRandomizedArray(
  category3Questions.slice(0, 5)
);
let category3Index = 0;
cat3.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (questionRoundOver === true) {
      count += 1;
      modal.classList.remove("hidden");
      question.textContent = randomizedCat3Array[category3Index].clue;
      questionAnswer = randomizedCat3Array[category3Index].answer;
      console.log(questionAnswer);
      questionValue = cell.textContent;
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
      guessButton.disabled = false;
      passButton.disabled = false;
      questionRoundOver = false;
      category3Index += 1;
    } else if (playerAnsweredCorrectly === true) {
      window.alert(`Please wait.`);
    } else {
      window.alert(`Please answer the question or pass.`);
    }
  });
});
// Category 4
let randomizedCat4Array =  getRandomizedArray(
  category4Questions.slice(0, 5)
);
let category4Index = 0;
cat4.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (questionRoundOver === true) {
      count += 1;
      modal.classList.remove("hidden");
      question.textContent = randomizedCat4Array[category4Index].clue;
      questionAnswer = randomizedCat4Array[category4Index].answer;
      console.log(questionAnswer);
      questionValue = cell.textContent;
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
      guessButton.disabled = false;
      passButton.disabled = false;
      questionRoundOver = false;
      category4Index += 1;
    } else if (playerAnsweredCorrectly === true) {
      window.alert(`Please wait.`);
    } else {
      window.alert(`Please answer the question or pass.`);
    }
  });
});
// Category 5
let randomizedCat5Array =  getRandomizedArray(category5Questions.slice(0, 5));
let category5Index = 0;
cat5.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (questionRoundOver === true) {
      count += 1;
      modal.classList.remove("hidden");
      question.textContent = randomizedCat5Array[category5Index].clue;
      questionAnswer = randomizedCat5Array[category5Index].answer;
      console.log(questionAnswer);
      questionValue = cell.textContent;
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
      guessButton.disabled = false;
      passButton.disabled = false;
      questionRoundOver = false;
      category5Index += 1;
    } else if (playerAnsweredCorrectly === true) {
      window.alert(`Please wait.`);
    } else {
      window.alert(`Please answer the question or pass.`);
    }
  });
});
// Category 6
let randomizedCat6Array =  getRandomizedArray(category6Questions.slice(0, 5));
let category6Index = 0;
cat6.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (questionRoundOver === true) {
      count += 1;
      modal.classList.remove("hidden");
      question.textContent = randomizedCat6Array[category6Index].clue;
      questionAnswer = randomizedCat6Array[category6Index].answer;
      console.log(questionAnswer);
      questionValue = cell.textContent;
      cell.textContent = null;
      cell.style.backgroundColor = "#00CED1";
      guessButton.disabled = false;
      passButton.disabled = false;
      questionRoundOver = false;
      category6Index += 1;
    } else if (playerAnsweredCorrectly === true) {
      window.alert(`Please wait.`);
    } else {
      window.alert(`Please answer the question or pass.`);
    }
  });
});

// Player Pass
let playerPassed = false;
passButton.addEventListener("click", (e) => {
  e.preventDefault();
  switchPlayers();
  if (playerPassed === true) {
    playerPassed = false;
    window.alert("Both players have passed.");
    question.textContent = `The Correct Answer Is: '${questionAnswer}'`;
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 4000);
    guessButton.disabled = true;
    passButton.disabled = true;
    questionValue = null;
    questionRoundOver = true;
    checkCount();
  } else if (playerGuessed === true) {
    window.alert(`Player has passed.`);
    modal.classList.add("hidden");
    playerInput.value = null;
    guessButton.disabled = true;
    passButton.disabled = true;
    playersSwitched = false;
    playerGuessed = false;
    questionRoundOver = true;
    checkCount();
  } else {
    playerPassed = true;
    window.alert(
      `Player has passed it is now Player ${currentPlayerTurn}'s chance to steal.`
    );
  }
});

function switchPlayers() {
  if (currentPlayerTurn === 1) {
    currentPlayerTurn = 2;
    playerTurn.textContent = player2Name
  } else if (currentPlayerTurn === 2) {
    currentPlayerTurn = 1;
    playerTurn.textContent = player1Name
  }
}

//Player Submit
let playerGuessed = false;
let playersSwitched = false;
guessButton.addEventListener("click", (e) => {
  e.preventDefault();
  playerGuessed = true;
  let playerGuess = playerInput.value;
  console.log(playerGuess);

  if (playerGuess.trim().toLowerCase() === questionAnswer.toLowerCase()) {
    playerAnsweredCorrectly = true;
    question.textContent = `Player ${currentPlayerTurn} GUESSED CORRECTLY!`;
    playerInput.value = null;
    setTimeout(() => {
      modal.classList.add("hidden");
      questionRoundOver = true;
      playerAnsweredCorrectly = false;
    }, 4000);
    if (currentPlayerTurn === 1) {
      player1CurrentScore =
        parseInt(player1CurrentScore) + parseInt(questionValue);
      player1ScoreMessage.textContent = `Player 1 Score: ${player1CurrentScore}`;
    } else {
      player2CurrentScore =
        parseInt(player2CurrentScore) + parseInt(questionValue);
      player2ScoreMessage.textContent = `Player 2 Score: ${player2CurrentScore}`;
    }
    guessButton.disabled = true;
    passButton.disabled = true;

    checkCount();
    checkScores();
  } else if (
    playerGuess.trim().toLowerCase() !== questionAnswer.toLowerCase() &&
    playersSwitched === true
  ) {
    if (currentPlayerTurn === 1) {
      player1CurrentScore =
        parseInt(player1CurrentScore) - parseInt(questionValue);
      player1ScoreMessage.textContent = `Player 1 Score: ${player1CurrentScore}`;
    } else {
      player2CurrentScore =
        parseInt(player2CurrentScore) - parseInt(questionValue);
      player2ScoreMessage.textContent = `Player 2 Score: ${player2CurrentScore}`;
    }
    playerInput.value = null;
    guessButton.disabled = true;
    passButton.disabled = true;
    playersSwitched = false;
    playerGuessed = false;
    questionRoundOver = true;
    question.textContent = `The Correct Answer Is: '${questionAnswer}'`;
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 4000);
    switchPlayers();
    checkCount();
    checkScores();
  } else {
    if (currentPlayerTurn === 1) {
      player1CurrentScore =
        parseInt(player1CurrentScore) - parseInt(questionValue);
      player1ScoreMessage.textContent = `Player 1 Score: ${player1CurrentScore}`;
    } else {
      player2CurrentScore =
        parseInt(player2CurrentScore) - parseInt(questionValue);
      player2ScoreMessage.textContent = `Player 2 Score: ${player2CurrentScore}`;
    }
    playerInput.value = null;
    window.alert(`Incorrect. It is now Player ${currentPlayerTurn}'s turn.`);
    switchPlayers();
    playersSwitched = true;
    checkCount();
    checkScores();
  }
});
