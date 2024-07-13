import React from 'react';
import HandCard from './HandCard.jsx';

const PlayerHand = ({ player, playerCards, currentPlayer, selectedCardIndex, handleCardClick, setPlayerCards }) => (
  <div className="player">
    <h2>{player === 'player1' ? 'Player 1' : 'Player 2'}</h2>
    <div className="hand">
      {playerCards.map((card, index) => (
        <HandCard
          key={`${player}-${index}`}
          card={card}
          onClick={() => handleCardClick(player, index)}
          isSelected={selectedCardIndex === index && currentPlayer === (player === 'player1' ? 1 : 2)}
        />
      ))}
    </div>
  </div>
);

export default PlayerHand;

