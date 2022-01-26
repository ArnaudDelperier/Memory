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
    document.getElementById("score-form").addEventListener('submit', async function(e) {
        e.preventDefault()

        const data = new FormData(e.target);

        try {
            // asynchrone donc on await
            const result = await fetch(`${utils.url_back}/add-score`, {
              method: 'POST',
              body: data,
            });
    
            // grâce au try catch, s'il n'y a pas d'erreur pendant l'await on redirige vers https://memory-back.herokuapp.com/Memory-Front/
            // ça aura pour effet de rafraîchir la page, et de voir le nouveau score entré à l'arrivé sur le site
            window.location = '/Memory-Front/';
    
            // s'il y'a une erreur pendant le fetch on l'affiche dans la console
          } catch (error) {
            console.log(error);
          }
    })

}