import React, { useEffect } from 'react';
import { useWallet } from './WalletContext';
import { useParams, useNavigate } from 'react-router-dom';

const Game = () => {
  const { address } = useParams();
  const { isConnected, blockNumber } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Game View</div>
      {isConnected ? (
        <div>
          <div>Playing as: {address}</div>
        </div>
      ) : (
        <div>Please connect your wallet</div>
      )}
    </div>
  );
};

export default Game;
