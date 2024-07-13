import React, { useState, useEffect } from 'react';
import { game } from './scriptGame.js';
import './App.css';
import Matrix from './matrice.jsx'; // Importer le composant Matrix

const couleurs = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6', '#FF8F33', '#33FFF3', '#8F33FF'];

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

const Card = ({ card, onClick }) => (
  <div
    className="card"
    style={{ backgroundColor: card.couleur }}
    onMouseDown={onClick}
  >
    {card.id}
  </div>
);

function App() {
  const [deck, setDeck] = useState([]);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    const initialDeck = generateCards();
    const { player1, player2, remainingDeck } = distributeCards(initialDeck);
    setPlayer1Cards(player1);
    setPlayer2Cards(player2);
    setDeck(remainingDeck);
  }, []);

  const handleCardClick = (player, setPlayerCards, cardIndex) => {
    if ((currentPlayer === 1 && player === 'player2') || (currentPlayer === 2 && player === 'player1')) return;

    if (deck.length === 0) return; // No more cards in the deck

    const newCard = deck[deck.length - 1];
    setPlayerCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[cardIndex] = newCard;
      return newCards;
    });

    setDeck((prevDeck) => prevDeck.slice(0, -1)); // Remove the last card from the deck
    game();
    setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1)); // Switch turns
  };

  return (
    <div className="App">
      <h1>Card Game</h1>
      <h2>Current Player: Player {currentPlayer}</h2>
      <div className="players">
        <div className="player">
          <h2>Player 1</h2>
          <div className="hand">
            {player1Cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                onClick={() => handleCardClick('player1', setPlayer1Cards, index)}
              />
            ))}
          </div>
        </div>
        <div className="player">
          <h2>Player 2</h2>
          <div className="hand">
            {player2Cards.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                onClick={() => handleCardClick('player2', setPlayer2Cards, index)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="deck">
        <h2>Remaining Deck</h2>
        <div className="grid">
          {deck.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
      <Matrix /> {/* Inclure le composant Matrix */}
    </div>
  );
}

export default App;

