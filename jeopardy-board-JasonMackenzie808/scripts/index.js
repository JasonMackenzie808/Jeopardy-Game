// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

// Landing Page Play Button
let playButton = document.getElementById("play-btn");

playButton.addEventListener("click", () => {
    let player1Name = window.prompt("Player 1 Name:") || "Player 1"
    console.log(player1Name)
    let player2Name = window.prompt("Player 2 Name:") || "Player 2"
    console.log(player2Name)
    document.location = `./round-1.html?round=1&player1=${player1Name}&player2=${player2Name}`
});

