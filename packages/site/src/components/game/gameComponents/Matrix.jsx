import React from 'react';
import Card from './Card.jsx';

const Matrix = ({ boardMatrix, selectedCard, onMatrixCardClick }) => (
  <div id="matrix">
    {boardMatrix.map((row, i) => (
      <React.Fragment key={i}>
        {row.map((card, j) => (
          <Card
            key={`${i}-${j}`}
            card={card}
            onClick={() => onMatrixCardClick(i, j)}
            isSelected={selectedCard && selectedCard.x === i && selectedCard.y === j}
            className={`row-${i} col-${j} ${i === 2 && j === 2 ? 'center-cell' : ''}`}
          />
        ))}
      </React.Fragment>
    ))}
  </div>
);

export default Matrix;
