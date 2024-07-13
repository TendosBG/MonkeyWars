import React from 'react';
import { useWallet } from './WalletContext';

const Home = () => {
  const { isConnected, address } = useWallet();

  return (
    <div className="flex flex-col items-center gap-4">
      {isConnected ? (
        <div>
          <div className="text-2xl font-bold">Connected</div>
          <a href={`/game/${address}`}>{address}</a>
        </div>
      ) : (
        <div className="text-2xl font-bold text-center">
            Not Connected
            <p>Please connect your Wallet using the top right button to continue.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
