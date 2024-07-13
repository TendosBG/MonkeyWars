import React, { useState, useEffect } from 'react';

import './App.css';

// --- Matrix Component ---
const Card = ({ card, onClick, isSelected }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''}`}
    style={{ backgroundColor: card ? card.couleur : 'lightgray' }}
    onClick={onClick}
  >
    {card ? card.id : ''}
  </div>
);

const Matrix = ({ boardMatrix, selectedCard, onMatrixCardClick }) => (
  <div id="matrix">
    {boardMatrix.map((row, i) => (
      <div key={i} className="row">
        {row.map((card, j) => (
          <Card
            key={`${i}-${j}`} // Ensure unique keys for matrix cells
            card={card}
            onClick={() => onMatrixCardClick(i, j)}
            isSelected={selectedCard && selectedCard.x === i && selectedCard.y === j}
          />
        ))}

      </div>
    ))}
  </div>
);

// --- App Component ---
const couleurs = [
  '#FF5733',
  '#33FF57',
  '#3357FF',
  '#F333FF',
  '#FF33A6',
  '#FF8F33',
  '#33FFF3',
  '#8F33FF',
];

const generateCards = () => {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    couleur: couleurs[i % couleurs.length],
  }));
};

const distributeCards = (cards) => {
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
  return {
    player1: shuffledCards.slice(0, 4),
    player2: shuffledCards.slice(4, 8),
    remainingDeck: shuffledCards.slice(8),
  };
};

const HandCard = ({ card, onClick, isSelected }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''}`}
    style={{ backgroundColor: card ? card.couleur : 'lightgray' }} // Handle null card
    onMouseDown={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)';
    }}
  >
    {card ? card.id : ''}
  </div>
);

function App() {
  const [deck, setDeck] = useState([]);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [boardMatrix, setBoardMatrix] = useState([]);

  useEffect(() => {
    const initialDeck = generateCards();
    const { player1, player2, remainingDeck } = distributeCards(initialDeck);
    setPlayer1Cards(player1);
    setPlayer2Cards(player2);
    setDeck(remainingDeck);

    
    const initialMatrix = Array(5)
      .fill(null)
      .map(() => Array(5).fill(null));
    setBoardMatrix(initialMatrix);
  }, []);

  const handleCardClick = (player, setPlayerCards, cardIndex) => {
    if (
      (currentPlayer === 1 && player === 'player2') ||
      (currentPlayer === 2 && player === 'player1')
    )
      return;

    setSelectedCardIndex(cardIndex);
  };

  const handleMatrixCardClick = (x, y) => {
    if (selectedCardIndex === null || boardMatrix[x][y] !== null) return;

    const selectedCard = currentPlayer === 1 ? player1Cards[selectedCardIndex] : player2Cards[selectedCardIndex];

    const newMatrix = [...boardMatrix];
    newMatrix[x][y] = selectedCard;
    setBoardMatrix(newMatrix);

    const newDeck = [...deck];
    const newCard = newDeck.pop() || null;

    if (currentPlayer === 1) {
      setPlayer1Cards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[selectedCardIndex] = newCard;
        return updatedCards;
      });
    } else {
      setPlayer2Cards((prevCards) => {
        const updatedCards = [...prevCards];
        updatedCards[selectedCardIndex] = newCard;
        return updatedCards;
      });
    }

    setDeck(newDeck);
    setSelectedCardIndex(null);
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
    
  };

  return (
    <div className="App">
      <h1>Card Game</h1>
      <h2>Current Player: Player {currentPlayer}</h2>

      <div className="players">
        {/* Player 1 Section */}
        <div className="player">
          <h2>Player 1</h2>
          <div className="hand">
            {player1Cards.map((card, index) => (
              <HandCard
                key={`player1-${index}`} // Ensure unique keys for player 1 hand cards
                card={card}
                onClick={() => handleCardClick('player1', setPlayer1Cards, index)}
                isSelected={selectedCardIndex === index && currentPlayer === 1}
              />
            ))}
          </div>
        </div>

        {/* Game Matrix */}
        <Matrix
          boardMatrix={boardMatrix}
          selectedCard={
            selectedCardIndex !== null
              ? (currentPlayer === 1 ? player1Cards[selectedCardIndex] : player2Cards[selectedCardIndex])
              : null
          }
          onMatrixCardClick={handleMatrixCardClick}
        />

        {/* Player 2 Section */}
        <div className="player">
          <h2>Player 2</h2>
          <div className="hand">
            {player2Cards.map((card, index) => (
              <HandCard
                key={`player2-${index}`} // Ensure unique keys for player 2 hand cards
                card={card}
                onClick={() => handleCardClick('player2', setPlayer2Cards, index)}
                isSelected={selectedCardIndex === index && currentPlayer === 2}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;





