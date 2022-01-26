function game() {

    // Timer 
    let time = 0

    const timer = document.createElement("div");
    timer.classList.add("timer");
    timer.innerHTML = `<p>Temps : ${time}</p>`;
    container.appendChild(timer);

    let setTimer = setInterval(() => {
        console.log("time " + time)
        time++
        timer.innerHTML = `<p>Temps : ${time}</p>`;
    }, 1000)

    // Board
    const boardDisplayed = document.createElement("div");
    boardDisplayed.id = "board";
    container.appendChild(boardDisplayed);

    // table containing face down cards
    const board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    
    // table containing face up cards
    const resultBoard = generateRandomBoard();
    
    function generateRandomBoard() {
        const randomBoard = [];
    
        // contains as many indexes as different cards
        const cardsValue = [0, 0, 0, 0, 0 ,0 ,0 ,0];
    
        for (let i=0; i<4; i++) {
            const row = [];
            for (let j=0; j<4; j++) {
                let end = false;
                while(!end) {
                    const random = Math.floor(Math.random() * 8)
                    // if there are less than 2 cards of this type in the board it is added otherwise we redraw a card randomly
                    if (cardsValue[random] < 2) {
                        row.push(random + 1);
                        cardsValue[random]++;
                        end = true;
                    }
                }
            }
            randomBoard.push(row);
        }
    
        return randomBoard;
    }
    
    // variable to manage the state of the game. 
    // Coordinates of the last card clicked
    // A counter to check if it is the first card returned or the second
    // A counter to check if we find all pairs
    // A boolean to check if an action is in progress or if the click is available
    let cardSelected = [0, 0];
    let actionCounter = 0;
    let winCounter = 0;
    let clickReady = true;
    
    // Function to create the html needed to display the board in game
    function displayBoard() {
    
        for (let i=0; i<board.length; i++) {
            const row = document.createElement("div")
            row.classList.add("row")
            for (let j=0; j<board[i].length; j++) {
                let card = board[i][j];
                if (card === 0) {
                    const elem = document.createElement("button")
                    elem.id = `${i}${j}`
                    elem.classList.add("card")
                    elem.textContent = "Afficher"
                    elem.onclick = () => {verifyCoordinates(`${i.toString()}${j.toString()}`)}
                    row.appendChild(elem)
                } else {
                    const elem = document.createElement("img")
                    elem.id = `${i}${j}`
                    elem.classList.add("card")
                    elem.src = `${getImage(card)}`
                    row.appendChild(elem)
                }
            }
            boardDisplayed.appendChild(row)
        }
    
    }
    
    
    // board start display
    displayBoard();
    
    // return the path of the image we want display
    function getImage(value) {
        imgPath = "./assets/";
        switch(value) {
            case 1:
                imgPath += "book_purple.png";
                break;
            case 2:
                imgPath += "heart.png";
                break;
            case 3:
                imgPath += "human.png";
                break;
            case 4:
                imgPath += "key.png";
                break;
            case 5:
                imgPath += "potion_green.png";
                break;
            case 6:
                imgPath += "shield_silver.png";
                break;
            case 7:
                imgPath += "skull.png";
                break;
            case 8:
                imgPath += "sword_silver.png";
                break;
            default:
                console.log("unexpected value")    
        }
    
        return imgPath;
    }
    
    function verifyCoordinates(buttonCoordinates) {
        if (clickReady) {
            // we increment the number of actions
            actionCounter++;
        
            // we retrieve the coordinates of the card clicked
            const row = buttonCoordinates.substr(0,1);
            const column = buttonCoordinates.substr(1,1);
    
            // flip the card clicked to display the image
            board[row][column] = resultBoard[row][column];
    
            // update the display
            boardDisplayed.textContent = ""
            displayBoard();
        
            // When we click on a second card we compare them
            if (actionCounter > 1) {
                // you can no longer click during the process
                clickReady = false
                // if the value of the card clicked does not correspond to the value of the card at the coordinates of the last card clicked
                if (board[row][column] !== resultBoard[cardSelected[0]][cardSelected[1]]) {
                    // we start a delay before flipping the cards face down and being able to click again
                    setTimeout(() => {
                        // we flip both cards face down
                        board[row][column] = 0;
                        board[cardSelected[0]][cardSelected[1]] = 0;
                        
                        // we save the last card clicked
                        cardSelected = [row, column];
    
                        updateGameState()
                    }, 1000)
                }
                // Otherwise you can click directly without delay
                else {
                    // we save the last card clicked
                    cardSelected = [row, column];

                    // player find a pair
                    winCounter++

                    if (winCounter > 0) {
                        winGame()
                    }

                    updateGameState()
                }
    
            } else {
                // we save the last card clicked
                cardSelected = [row, column];

            }
    
            // play flip animation when clicking
            const cardId = `${row.toString()}${column.toString()}`;
            const card = document.getElementById(cardId);
            card.classList.add("flip")      
        }
    }
    
    function updateGameState() {
        clickReady = true;
        actionCounter = 0;
        boardDisplayed.textContent = ""
        displayBoard();
    }

    function winGame() {

        displayModal()

        // clean timer
        clearInterval(setTimer)
    }

    function displayModal() {
        // we opacify the background and make it non-clickable
        const modalBackground = document.createElement("div");
        modalBackground.classList.add("modal-background");
        container.appendChild(modalBackground);

        // we create a modal to save your score and return to the menu
        const modal = document.createElement("div");
        modal.classList.add("modal");
        container.appendChild(modal);

        modal.innerHTML =  `<p class="modal-text">Victoire !</p>
                            <p class="modal-text">Vous avez gagné en ${time} secondes</p>
                            <form action="" method="get">

                                <label for="pseudo">Entrez votre pseudo : </label>
                                <input type="text" name="pseudo" id="pseudo" required>


                                <input type="submit" value="Enregistrer">

                            </form>
                            <button id="modal-btn">Menu</button>`;
        document.getElementById("modal-btn").onclick = returnToMenu;
    }


    // button to return to the menu
    const menuButton = document.createElement("button");
    menuButton.textContent = "Menu";
    menuButton.onclick = returnToMenu;
    container.appendChild(menuButton);

    function returnToMenu() {
        // clean timer
        clearInterval(setTimer)
        gameState = "menu";
        checkGameState();
    }
}