import React from 'react';
import Card from './Card.jsx';

const Matrix = ({ boardMatrix, selectedCard, onMatrixCardClick }) => (
    <div id="matrix">
        {boardMatrix.map((row, i) => (
            <div key={i} className={`row ${i === 1 || i === 3 ? 'multiplier-row' : ''}`}>
                {row.map((card, j) => (
                    <Card
                        key={`${i}-${j}`}
                        card={card}
                        onClick={() => onMatrixCardClick(i, j)}
                        isSelected={selectedCard && selectedCard.x === i && selectedCard.y === j}
                        className={j === 2 ? 'multiplier-column' : ''}
                    />
                ))}
            </div>
        ))}
    </div>
);

export default Matrix;


