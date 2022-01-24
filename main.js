// Créer une grille pour afficher les cartes face cachés
//    [
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0],
//     [0, 0, 0, 0]
//    ]

// Meme chose pour la grille generé avec des pairs
//    [
//     [1, 3, 3, 5],
//     [7, 1, 2, 4],
//     [8, 4, 6, 8],
//     [6, 2, 5, 7]
//    ] 

// fonction pour afficher tabmeau qui va génerer le html
// on parcours le tableau avec double boucle pour concatener le html a rendre
// monHtml = "<div class=container> ** une autre div pour chaque case **</div>"

// chaque chiffre affiche une image differente (0 = la carte face caché)

// Quand on clique sur une case on va afficher à la place la case du tableau de résultat
// On sauvegarde les coordonées du premier clique et combien d'image retourné (si premier clique ou 2eme)
// si on en ets au 2eme clique alors on vérifie


const boardDisplayed = document.getElementById("board");

const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function displayBoard() {
    let result = "";

    for (let i=0; i<board.length; i++) {
        result += '<div class="line">'
        for (let j=0; j<board[i].length; j++) {
            result += '<button class="card">Afficher</button>'
        }
        result += "</div>"
    }

    boardDisplayed.innerHTML = result;
}

displayBoard();

