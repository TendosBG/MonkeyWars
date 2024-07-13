import React, { useState, useEffect } from 'react';
import './App.css';
import Matrix from './Matrix.jsx';
import PlayerHand from './PlayerHand.jsx';
import { generateCards, distributeCards } from './cardUtils.js';
import { playerColors } from './constant.js';


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

    const initialMatrix = Array(5).fill(null).map(() => Array(5).fill(null));
    setBoardMatrix(initialMatrix);
  }, []);

  const handleCardClick = (player, cardIndex) => {
    if ((currentPlayer === 1 && player === 'player2') || (currentPlayer === 2 && player === 'player1')) return;
    setSelectedCardIndex(cardIndex);
  };

  const handleMatrixCardClick = (x, y) => {
    if (selectedCardIndex === null || boardMatrix[x][y] !== null) return;

    const selectedCard = currentPlayer === 1 ? player1Cards[selectedCardIndex] : player2Cards[selectedCardIndex];
    const newMatrix = [...boardMatrix];
    newMatrix[x][y] = selectedCard;
    setBoardMatrix(newMatrix);

    const newDeck = [...deck];
    let newCard = newDeck.pop() || null;
    if (newCard) {
      newCard = { ...newCard, couleur: currentPlayer === 1 ? playerColors.player1 : playerColors.player2 };
    }

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
        <PlayerHand
          player="player1"
          playerCards={player1Cards}
          currentPlayer={currentPlayer}
          selectedCardIndex={selectedCardIndex}
          handleCardClick={handleCardClick}
          setPlayerCards={setPlayer1Cards}
        />
        <Matrix
          boardMatrix={boardMatrix}
          selectedCard={selectedCardIndex !== null ? (currentPlayer === 1 ? player1Cards[selectedCardIndex] : player2Cards[selectedCardIndex]) : null}
          onMatrixCardClick={handleMatrixCardClick}
        />
        <PlayerHand
          player="player2"
          playerCards={player2Cards}
          currentPlayer={currentPlayer}
          selectedCardIndex={selectedCardIndex}
          handleCardClick={handleCardClick}
          setPlayerCards={setPlayer2Cards}
        />
      </div>
    </div>
  );
}

export default App;






