function modal(time, returnToMenu) {
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
                        <form action="" method="post" id="score-form">

                            <label for="pseudo">Entrez votre pseudo : </label>
                            <input type="text" name="pseudo" id="pseudo" required>


                            <input type="submit" value="Enregistrer">

                        </form>
                        <button id="modal-btn">Menu</button>`;
    document.getElementById("modal-btn").onclick = returnToMenu;

    // Method to submit score in database
    document.getElementById("score-form").addEventListener('submit', async function(e) {
        e.preventDefault()

        // We create a new FormData with information of the score-form
        const data = new FormData(e.target);
        // We add score (time to complete memory) in the request
        data.append("time", time)

        try {
            const result = await fetch(`http://localhost:3000/add-score`, {
              method: 'POST',
              body: data,
            });
    
            // Redirect to Menu
            window.location = '/';
    
          } catch (error) {
            console.log(error);
          }
    })
}