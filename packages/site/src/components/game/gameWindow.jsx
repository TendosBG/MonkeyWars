import React, { useState, useEffect } from 'react';
import './App.css';
import Carte from './Card.jsx';

const couleurs = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A6', '#FF8F33', '#33FFF3', '#8F33FF'];

const generateCards = () => {
  let cards = [];
  for (let i = 0; i < 16; i++) {
    cards.push(new Carte(i, couleurs[i % couleurs.length]));
  }
  return cards;
};

const distributeCards = (cards) => {
  let player1 = [];
  let player2 = [];
  for (let i = 0; i < 4; i++) {
    player1.push(cards.pop());
    player2.push(cards.pop());
  }
  return { player1, player2, remainingDeck: cards };
};

function App() {
  const [deck, setDeck] = useState(generateCards());
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);

  useEffect(() => {
    const { player1, player2, remainingDeck } = distributeCards([...deck]);
    setPlayer1Cards(player1);
    setPlayer2Cards(player2);
    setDeck(remainingDeck);
  }, []);

  const handleCardClick = (player, setPlayerCards, cardIndex) => {
    
    if ((currentPlayer === 1 && player === 'player2') || (currentPlayer === 2 && player === 'player1')) return; // Not the player's turn

    const newCard = deck[deck.length -1];

    setPlayerCards((prevCards) => {
      if (deck.length === 0) {const newCards = [...prevCards];
        newCards.splice(cardIndex, 1);
        return newCards;}
      const newCards = [...prevCards];
      newCards[cardIndex] = newCard;
      setDeck([...deck]); // Update the deck
      deck.pop();
      
      return newCards;
    });

    // Switch turns
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
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
              <div
                key={card.id}
                className="card"
                style={{ backgroundColor: card.couleur }}
                onClick={() => handleCardClick('player1', setPlayer1Cards, index)}
              >
                {card.id}
              </div>
            ))}
          </div>
        </div>
        <div className="player">
          <h2>Player 2</h2>
          <div className="hand">
            {player2Cards.map((card, index) => (
              <div
                key={card.id}
                className="card"
                style={{ backgroundColor: card.couleur }}
                onClick={() => handleCardClick('player2', setPlayer2Cards, index)}
              >
                {card.id}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="deck">
        <h2>Remaining Deck</h2>
        <div className="grid">
          {deck.map((card) => (
            <div key={card.id} className="card" style={{ backgroundColor: card.couleur }}>
              {card.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;