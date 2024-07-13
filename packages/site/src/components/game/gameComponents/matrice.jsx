// Matrix.jsx
import React, { useState, useEffect } from 'react';
import './matrice.css';

const Card = ({ card, onClick }) => (
  <div
    className="card"
    style={{ backgroundColor: card.color }}
    onClick={onClick}
  >
    {card.type}
  </div>
);

const Matrix = () => {
  const [boardMatrix, setBoardMatrix] = useState([]);
  const [hand, setHand] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const matrixSize = 5;

  useEffect(() => {
    const centralCard = { x: 2, y: 2, type: 'central', color: 'red' };
    const initialMatrix = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(null));
    initialMatrix[1][2] = { x: 1, y: 2, type: 'empty', color: 'lightgray' };
    initialMatrix[2][1] = { x: 2, y: 1, type: 'empty', color: 'lightgray' };
    initialMatrix[2][2] = centralCard;
    initialMatrix[2][3] = { x: 2, y: 3, type: 'empty', color: 'lightgray' };
    initialMatrix[3][2] = { x: 3, y: 2, type: 'empty', color: 'lightgray' };
    setBoardMatrix(initialMatrix);

    const initialHand = Array.from({ length: 4 }, (_, i) => ({ x: 0, y: 0, type: 'hand', color: 'blue' }));
    setHand(initialHand);
  }, []);

  const handleCardClick = (x, y) => {
    if (!selectedCard || boardMatrix[x][y]?.type !== 'empty') return;

    const newMatrix = boardMatrix.map(row => row.slice());
    newMatrix[x][y] = selectedCard;
    setBoardMatrix(newMatrix);

    setSelectedCard(null);
  };

  const handleHandCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <div id="container">
      <div id="matrix">
        {boardMatrix.map((row, i) => (
          <div key={i} className="row">
            {row.map((card, j) => (
              <Card key={j} card={card || { type: 'empty', color: 'white' }} onClick={() => handleCardClick(i, j)} />
            ))}
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Matrix;

