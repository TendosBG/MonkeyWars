import React from 'react';

const HandCard = ({ card, onClick, isSelected }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''}`}
    style={{ backgroundColor: card ? card.couleur : 'lightgray' }}
    onMouseDown={onClick}
  >
    {card ? card.id : ''}
  </div>
);

export default HandCard;

