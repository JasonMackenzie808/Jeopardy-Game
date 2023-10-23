async function fetchJeopardyQuestions() {
  const url = "https://jarchive-json.glitch.me//game/10/18/2022"
  try {
    let response = await fetch(url);
    let data = await response.json();
    let question = data["final jeopardy"]

    return question

  } catch (error) {
    console.error(error);
  }
}
let finalJeopardy = await fetchJeopardyQuestions();

console.log("It's working from final-round");

// Get Passed Data From Round 1

let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);

let player1Name = urlParams.get("player1")
let player2Name = urlParams.get("player2")

// Set Player Turn

let playerTurn = document.getElementById("player-turn");
let currentPlayerTurn = urlParams.get("playerturn");
console.log(currentPlayerTurn);

if (currentPlayerTurn === 1) {
  playerTurn.textContent = player1Name 
} else if (currentPlayerTurn === 2) {
  playerTurn.textContent = player2Name 
}

// Element Declarations

let questionHeader = document.getElementById("question-header");
questionHeader.textContent = "PLEASE ENTER YOUR WAGER BELOW";

let question = document.getElementById("final-question");
question.textContent = "";

let player1ScoreMessage = document.getElementById("player1-score");
let player2ScoreMessage = document.getElementById("player2-score");

let playerBet = document.getElementById("bet-amount");
let playerAnswer = document.getElementById("player-answer");

// Passing Player Scores from Round 2
let player1CurrentScore = urlParams.get("player1score");
let player2CurrentScore = urlParams.get("player2score");
player1ScoreMessage.textContent = `Player 1 Score: ${player1CurrentScore}`;
player2ScoreMessage.textContent = `Player 2 Score: ${player2CurrentScore}`;

let player1Wager;
let player2Wager;

// Buttons

let betButton = document.getElementById("bet-btn");
let guessButton = document.getElementById("guess-btn");

//Button Even Listeners
let betCount = 0;
betButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (parseInt(currentPlayerTurn) === 1) {
    if (parseInt(playerBet.value) <= parseInt(player1CurrentScore)) {
      player1Wager = parseInt(playerBet.value);
      console.log(player1Wager);
      switchPlayers();
      playerBet.value = null;
      betCount += 1;
      if (betCount === 2) {
        betButton.disabled = true;
        questionHeader.textContent = "FINAL QUESTION:";
        question.textContent =
          finalJeopardy.clue;
        guessButton.disabled = false;
      }
    } else {
      window.alert("Wager cannot be greater than player score.");
      playerBet.value = null;
    }
  } else if (parseInt(currentPlayerTurn) === 2) {
    if (parseInt(playerBet.value) <= parseInt(player2CurrentScore)) {
      player2Wager = parseInt(playerBet.value);
      console.log(player2Wager);
      switchPlayers();
      playerBet.value = null;
      betCount += 1;
      if (betCount === 2) {
        betButton.disabled = true;
        questionHeader.textContent = "FINAL QUESTION:";
        question.textContent =
        finalJeopardy.clue;
        guessButton.disabled = false;
      }
    } else {
      window.alert("Wager cannot be greater than player score.");
      playerBet.value = null;
    }
  }
});

let answer = finalJeopardy.answer;
let player1FinalScore;
let player2FinalScore;
let answerCount = 0;
guessButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (parseInt(currentPlayerTurn) === 1) {
    if (playerAnswer.value.trim().toLowerCase() === answer.toLowerCase()) {
      player1FinalScore = player1Wager + parseInt(player1CurrentScore);
      answerCount += 1;
      playerAnswer.value = null;
      switchPlayers();
    } else if (
      playerAnswer.value.trim().toLowerCase() !== answer.toLowerCase()
    ) {
      player1FinalScore = parseInt(player1CurrentScore) - player1Wager;
      answerCount += 1;
      playerAnswer.value = null;
      switchPlayers();
    }
    if (answerCount === 2) {
      console.log(player1FinalScore);
      console.log(player2FinalScore);
      guessButton.disabled = true;
      player1ScoreMessage.textContent = `Player 1 Score: ${player1FinalScore}`;
      player2ScoreMessage.textContent = `Player 2 Score: ${player2FinalScore}`;
      questionHeader.textContent = "CORRECT ANSWER:";
      question.textContent = "Function";
      question.style.fontSize = "1.75em";
      if (player1FinalScore > player2FinalScore) {
        setTimeout(() => {window.alert("Congratulations Player 1! You won!");
      }, 2000)
      } else if (player2FinalScore > player1FinalScore) {
        setTimeout(() => {window.alert("Congratulations Player 2! You won!");
      }, 2000)
      } else {
        setTimeout(() => {window.alert("Wow! Congratulations to both of you! It's a tie!");
      }, 2000)
      }
    }
  } else if (parseInt(currentPlayerTurn) === 2) {
    if (playerAnswer.value.trim().toLowerCase() === answer.toLowerCase()) {
      player2FinalScore = player2Wager + parseInt(player2CurrentScore);
      answerCount += 1;
      playerAnswer.value = null;
      switchPlayers();
    } else if (
      playerAnswer.value.trim().toLowerCase() !== answer.toLowerCase()
    ) {
      player2FinalScore = parseInt(player2CurrentScore) - player2Wager;
      answerCount += 1;
      playerAnswer.value = null;
      switchPlayers();
    }
    if (answerCount === 2) {
      console.log(player1FinalScore);
      console.log(player2FinalScore);
      guessButton.disabled = true;
      player1ScoreMessage.textContent = `Player 1 Score: ${player1FinalScore}`;
      player2ScoreMessage.textContent = `Player 2 Score: ${player2FinalScore}`;
      questionHeader.textContent = "CORRECT ANSWER:";
      question.textContent = "Function";
      if (player1FinalScore > player2FinalScore) {
        setTimeout(() => {window.alert("Congratulations Player 1! You won!");
      }, 2000)
      } else if (player2FinalScore > player1FinalScore) {
        setTimeout(() => {window.alert("Congratulations Player 2! You won!");
      }, 2000)
      } else {
        setTimeout(() => {window.alert("Wow! Congratulations to both of you! It's a tie!");
      }, 2000)
      }
    }
  }
});

// Switch Players Function
function switchPlayers() {
  if (currentPlayerTurn === 1) {
    currentPlayerTurn = 2;
    playerTurn.textContent = player2Name
  } else if (currentPlayerTurn === 2) {
    currentPlayerTurn = 1;
    playerTurn.textContent = player1Name
  }
}