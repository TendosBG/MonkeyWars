import { couleurs, playerColors } from './constant.js';

export const generateCards = () => {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    couleur: couleurs[i % couleurs.length],
  }));
};

export const distributeCards = (cards) => {
  const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

  const player1Cards = shuffledCards.slice(0, 4).map(card => ({
    ...card,
    couleur: playerColors.player1
  }));
  const player2Cards = shuffledCards.slice(4, 8).map(card => ({
    ...card,
    couleur: playerColors.player2
  }));

  return {
    player1: player1Cards,
    player2: player2Cards,
    remainingDeck: shuffledCards.slice(8),
  };
};

