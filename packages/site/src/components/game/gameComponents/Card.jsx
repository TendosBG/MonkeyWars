import React from 'react';

const Card = ({ card, onClick, isSelected, className }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''} ${className}`}
    onClick={onClick}
  >
    {card ? card.id : ''}
  </div>
);

export default Card;
