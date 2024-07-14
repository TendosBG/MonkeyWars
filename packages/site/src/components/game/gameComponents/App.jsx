import React, { useState, useEffect } from 'react';
import './App.css';
import Matrix from './Matrix.jsx';
import PlayerHand from './PlayerHand.jsx';
import { generateCards, distributeCards } from './cardUtils.js';
import { playerColors } from './constant.js';
import { useWriteContract } from 'wagmi';
import { MonkeyWarsABI } from '../../../abi.ts';
import { useRoom } from '../../../context/RoomContext.jsx';
import { useNavigate } from 'react-router-dom';

function App() {
  const [deck, setDeck] = useState([]);
  const [player1Cards, setPlayer1Cards] = useState([]);
  const [player2Cards, setPlayer2Cards] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [boardMatrix, setBoardMatrix] = useState(Array(5).fill(null).map(() => Array(5).fill(null)));
  const [totalMoves, setTotalMoves] = useState(0);
  const [winner, setWinner] = useState(null);
  const [player1Moves, setPlayer1Moves] = useState(0);
  const [player2Moves, setPlayer2Moves] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const maxMovesPerPlayer = 8; // Nombre maximum de coups par joueur
  const { writeContract } = useWriteContract();
  const { deleteRoom } = useRoom();
  const navigate = useNavigate();

  // Multiplicateurs
  const centerColumnMultiplier = 3;
  const centerRowMultiplier = 2;

  useEffect(() => {
    const initialDeck = generateCards();
    const { player1, player2, remainingDeck } = distributeCards(initialDeck);
    setPlayer1Cards(player1);
    setPlayer2Cards(player2);
    setDeck(remainingDeck);
  }, []);

  const handleCardClick = (player, cardIndex) => {
    if ((currentPlayer === 1 && player === 'player2') || (currentPlayer === 2 && player === 'player1') || winner !== null) return;
    setSelectedCardIndex(cardIndex);
  };

  const handleMatrixCardClick = (x, y) => {
    if (selectedCardIndex === null || winner !== null) return;

    const selectedCard = currentPlayer === 1 ? player1Cards[selectedCardIndex] : player2Cards[selectedCardIndex];
    const existingCard = boardMatrix[x][y];

    // Condition pour remplacer la carte
    if (existingCard === null || selectedCard.id > existingCard.id) {
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
        setPlayer1Moves(player1Moves + 1);
      } else {
        setPlayer2Cards((prevCards) => {
          const updatedCards = [...prevCards];
          updatedCards[selectedCardIndex] = newCard;
          return updatedCards;
        });
        setPlayer2Moves(player2Moves + 1);
      }

      setDeck(newDeck);
      setSelectedCardIndex(null);
      setCurrentPlayer((prevPlayer) => (prevPlayer === 1 ? 2 : 1));
      setTotalMoves(totalMoves + 1);

      checkAndCaptureTerritory(newMatrix, x, y, selectedCard.couleur);
      checkGameEnd(newMatrix);
    }
  };

  const checkAndCaptureTerritory = (matrix, x, y, color) => {
    const directions = [
      [-1, -1], [-1, 1], [1, -1], [1, 1]
    ];

    directions.forEach(([dx, dy]) => {
      const corner1 = getCell(matrix, x + dx, y);
      const corner2 = getCell(matrix, x, y + dy);
      const corner3 = getCell(matrix, x + dx, y + dy);

      if (corner1 === color && corner2 === color && corner3 === color) {
        captureArea(matrix, x, y, x + dx, y + dy, color);
      }
    });

    setBoardMatrix([...matrix]);
  };

  const getCell = (matrix, x, y) => {
    return (matrix[x] && matrix[x][y]) ? matrix[x][y].couleur : null;
  };

  const captureArea = (matrix, x1, y1, x2, y2, color) => {
    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    for (let i = minX + 1; i < maxX; i++) {
      for (let j = minY + 1; j < maxY; j++) {
        if (matrix[i][j] !== null) {
          matrix[i][j].couleur = color;
        }
      }
    }
  };

  const checkGameEnd = (matrix) => {
    const totalCardsOnBoard = matrix.flat().filter(card => card !== null).length;
    if (totalCardsOnBoard === 25 || player1Moves === maxMovesPerPlayer || player2Moves === maxMovesPerPlayer) {
      determineWinner(matrix);
    }
  };

  const determineWinner = (matrix) => {
    let p1Score = 0;
    let p2Score = 0;

    matrix.forEach((row, rowIndex) => {
      row.forEach((card, colIndex) => {
        if (card) {
          let score = card.id;

          // Appliquer les multiplicateurs à la colonne centrale et aux lignes 1 et 3
          if (colIndex === 2) {
            score *= centerColumnMultiplier;
          }
          if (rowIndex === 1 || rowIndex === 3) {
            score *= centerRowMultiplier;
          }

          if (card.couleur === playerColors.player1) {
            p1Score += score;
          } else if (card.couleur === playerColors.player2) {
            p2Score += score;
          }
        }
      });
    });

    setPlayer1Score(p1Score);
    setPlayer2Score(p2Score);

    if (p1Score > p2Score) {
      setWinner(1);
    } else if (p2Score > p1Score) {
      setWinner(2);
    } else {
      setWinner('draw');
    }
    writeContract({
      address: '0x8C3E7423302b461169cA1bb79151C21055733D3F',
      abi: MonkeyWarsABI,
      functionName: 'endGame',
      args: ["0xc9F43FE06f6cE883a406Add8Dca216E642e23cD3"],
    });

    deleteRoom("0xc9F43FE06f6cE883a406Add8Dca216E642e23cD3");
    deleteRoom("0xe80a5ff2da2ae9b6524E50c3CCF9D538bcB91bc9");

    navigate('/');
    alert('You have won the game!');
  };

  return (
    <div className="App">
      <h1>Card Game</h1>
      {winner ? (
        <>
          {winner === 'draw' ? <h2>It's a draw!</h2> : <h2>Player {winner} wins!</h2>}
          <div>
            <p>Player 1 Score: {player1Score}</p>
            <p>Player 2 Score: {player2Score}</p>
          </div>
        </>
      ) : (
        <h2>Current Player: Player {currentPlayer}</h2>
      )}
      <div className="players">
        <PlayerHand
          player="player1"
          playerCards={player1Cards}
          currentPlayer={currentPlayer}
          selectedCardIndex={selectedCardIndex}
          handleCardClick={handleCardClick}
        />
        <Matrix
          boardMatrix={boardMatrix}
          onMatrixCardClick={handleMatrixCardClick}
        />
        <PlayerHand
          player="player2"
          playerCards={player2Cards}
          currentPlayer={currentPlayer}
          selectedCardIndex={selectedCardIndex}
          handleCardClick={handleCardClick}
        />
      </div>
    </div>
  );
}

export default App;

