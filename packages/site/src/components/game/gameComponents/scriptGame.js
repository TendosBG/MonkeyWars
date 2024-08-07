function game() {
    

    fillHand();
    renderMatrix();
} 

    let hand = [];
    let color = 'blue';
    var clickedEmptyCard = [];
    var selectedCard = null;

    class Card {
        constructor(id, couleur) {
          this.id = id;
          this.couleur = couleur;
        }
        handleClick() {
          selectedCard = this;
          console.log(selectedCard);
      }
      }

    class availableCard extends Card {
        constructor(x, y, type = 'empty', color = 'lightgray') {
            super(x, y, type, color);
    }

    handleClick() {
        clickedEmptyCard.push({ x: this.x, y: this.y });
        console.log(clickedEmptyCard);
        
        if (selectedCard !== null) {
            placeCard(this.x, this.y);
            selectedCard = null;
        }
        
    }
}

const matrixSize = 5;
const centralCard = new Card(2, 2, 'central', 'red');

let boardMatrix = [
    [null, null, null, null, null],
    [null, null, new availableCard(1, 2), null, null],
    [null, new availableCard(2, 1), centralCard, new availableCard(2, 3), null],
    [null, null, new availableCard(3, 2), null, null],
    [null, null, null, null, null]
];

function renderMatrix() {
    const matrix = document.getElementById('matrix');
    matrix.innerHTML = '';
    for (let i = 0; i < matrixSize; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < matrixSize; j++) {
            const card = boardMatrix[i][j];
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.style.backgroundColor = card ? card.color : 'white';
            if (card && card instanceof availableCard) {
                cardElement.addEventListener('click', card.handleClick.bind(card));
            }
            row.appendChild(cardElement);
        }
        matrix.appendChild(row);
    }
}

function fillHand() {
    for (let i = 0; i < 4; i++) {
        hand.push(new Card(0, 0, 'hand', color));
    }
    console.log(hand);
    for (let card of hand) {
        let cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.style.backgroundColor = card.color;
        cardElement.addEventListener('click', () => {
            selectedCard = this;
            console.log(selectedCard);
        });
        document.getElementById('hand').appendChild(cardElement);
        console.log('bendo');
    }
}

function placeCard(x, y) {
    if (hand.length === 0 || !(boardMatrix[x][y] instanceof availableCard)) {
        return;
    }
    if (x > 0 && boardMatrix[x - 1][y] === null) {
        boardMatrix[x - 1][y] = new availableCard(x - 1, y);
    }
    if (x < matrixSize - 1 && boardMatrix[x + 1][y] === null) {
        boardMatrix[x + 1][y] = new availableCard(x + 1, y);
    }
    if (y > 0 && boardMatrix[x][y - 1] === null) {
        boardMatrix[x][y - 1] = new availableCard(x, y - 1);
    }
    if (y < matrixSize - 1 && boardMatrix[x][y + 1] === null) {
        boardMatrix[x][y + 1] = new availableCard(x, y + 1);
    }
   
    card.x = x;
    card.y = y;
    boardMatrix[x][y] = card;
    renderMatrix();
    
}



export default Card;
