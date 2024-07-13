import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { client } from '../providers/client';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { isConnected, address } = useAccount();
  const [blockNumber, setBlockNumber] = useState(null);

  useEffect(() => {
    client.getBlockNumber().then((block) => {
      setBlockNumber(block);
    });
  }, []);

  return (
    <WalletContext.Provider value={{ isConnected, address, blockNumber }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  return useContext(WalletContext);
};
