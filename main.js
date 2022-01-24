const container = document.getElementById("container")

let gameState = "menu";

// this function cleans the old screen before displaying the new screen
function checkGameState() {

    container.textContent = ""

    switch (gameState) {
        case "menu":
            menu()
            break;
        case "game":
            game()
            break;
        default: console.log("error")
    }
}

checkGameState()



