import React from 'react';
import { useWallet } from '../context/WalletContext';
import { useRoom } from '../context/RoomContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isConnected, address } = useWallet();
  const { rooms } = useRoom();

  return (
    <div className="flex flex-col items-center gap-4">
      {isConnected ? (
        <>
          <div className="text-2xl font-bold">Connected</div>
          <a href={`/game/${address}`}>{address}</a>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Available Rooms:</h2>
            <ul>
            {rooms.map((room, index) => (
                <li key={index}>
                <Link to={`/game/${room.address}`}>{room.address}</Link>
                </li>
            ))}
            </ul>
        </div>
        </>
      ) : (
        <div className="text-2xl font-bold">Not Connected</div>
      )}
      
    </div>
  );
};

export default Home;
