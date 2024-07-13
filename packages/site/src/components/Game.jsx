import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { usePrepareContractWrite, useContractWrite, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import GameContractABI from "../../../blockchain/artifacts/contracts/GameContract.sol/GameContract.json";

const CONTRACT_ADDRESS = "0xA85679DdCA323C2Abf1A6bed7209A81c29e03661";

const Game = () => {
  const { address } = useParams();
  const { address: playerAddress, isConnected } = useAccount();
  const navigate = useNavigate();
  const [betAmount, setBetAmount] = useState('0.001'); // Default bet amount
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
      return;
    }

    const roomRef = db.ref('rooms').child(address);

    roomRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setRoomData(data);
    });

    return () => {
      roomRef.off();
    };
  }, [isConnected, address, navigate]);

  const { config: createGameConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: GameContractABI.abi,
    functionName: "createGame",
    args: [ethers.utils.parseEther(betAmount)],
  });

  const { write: createGame } = useContractWrite(createGameConfig);

  const { config: joinGameConfig } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: GameContractABI.abi,
    functionName: "joinGame",
  });

  const { write: joinGame } = useContractWrite(joinGameConfig);

  const handleCreateGame = () => {
    createGame();
  };

  const handleJoinGame = () => {
    joinGame();
  };

  const getRoomPlayers = () => {
    if (roomData) {
      let players = [];
      if (roomData.user1) players.push(roomData.user1.address);
      if (roomData.user2) players.push(roomData.user2.address);
      return players.join(', ');
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Game View - Players: {roomData ? `${roomData.user1 && roomData.user2 ? 2 : 1}/2` : '0/2'}</div>
      {isConnected ? (
        <div>
          <div>Game of: {address}</div>
          <div>Players: {getRoomPlayers()}</div>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            placeholder="Bet Amount in ETH"
          />
          <button onClick={handleCreateGame}>Create Game</button>
          <button onClick={handleJoinGame}>Join Game</button>
        </div>
      ) : (
        <div>Please connect your wallet</div>
      )}
    </div>
  );
};

export default Game;
