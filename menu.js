const e = require("cors");

function menu() {

    let scores = []
    // fetch scores data
    async function getScores() {
        try {
            let result = await fetch(`http://localhost:3000/get-all-scores`, {
                method: 'GET',
            });
            scores = await result.json()

            // we create an html table with the data we have fetch
            let string = ""
            for (item of scores) {
                string +=`<tr><td>${item.place}</td><td>${item.pseudo}</td><td>${item.time}</td></tr>`
            }
            scoreBoard.innerHTML += string

        } catch (error) {
            console.log(error)
        }
    }




    // add button to launch a game
    const playButton = document.createElement("button");
    playButton.textContent = "Jouer";
    playButton.onclick = launchGame;
    container.appendChild(playButton);

    // add scoreboard
    const scoreBoard = document.createElement("table");
    scoreBoard.classList.add("scoreBoard");
    container.appendChild(scoreBoard);
    scoreBoard.innerHTML = "<thead><tr><th>Place</th><th>Pseudo</th><th>Temps</th></tr></thead>"
    getScores()




    function launchGame() {
        gameState = "game";
        checkGameState();
    }
}