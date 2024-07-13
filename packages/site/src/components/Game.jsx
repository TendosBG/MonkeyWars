import React, { useEffect } from 'react';
import { useWallet } from '../context/WalletContext';
import { useRoom } from '../context/RoomContext';
import { useParams, useNavigate } from 'react-router-dom';

const Game = () => {
  const { address } = useParams();
  const { isConnected } = useWallet();
  const { rooms, addRoom } = useRoom();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
    } else {
      // Check if the room already exists
      const roomExists = rooms.find(room => room.address === address);
      if (!roomExists) {
        addRoom({ address });
      }
    }
  }, [isConnected, rooms, address, navigate, addRoom]);

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
