function menu() {
    const playButton = document.createElement("button")
    playButton.textContent = "Jouer"
    playButton.onclick = launchGame
    container.appendChild(playButton)

    function launchGame() {
        gameState = "game"
        checkGameState()
    }
}