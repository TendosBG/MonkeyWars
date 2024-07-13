import React from 'react';

const Card = ({ card, onClick, isSelected }) => (
  <div
    className={`card ${isSelected ? 'selected' : ''}`}
    style={{ backgroundColor: card ? card.couleur : 'lightgray' }}
    onClick={onClick}
  >
    {card ? card.id : ''}
  </div>
);

export default Card;

