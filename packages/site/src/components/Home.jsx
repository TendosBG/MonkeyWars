import React from 'react';
import { useWallet } from '../context/WalletContext.jsx';
import { useRoom } from '../context/RoomContext.jsx';
import { Link } from 'react-router-dom';
import { MonkeyWarsABI } from '../abi.ts';
import {  useWriteContract } from 'wagmi';
import { parseEther } from 'viem';


const Home = () => {

  const { writeContract, error} = useWriteContract()
console.log(error)

  const { isConnected, address } = useWallet();
  const { rooms, deleteRoom } = useRoom(); // Assurez-vous d'importer la fonction de suppression de la salle depuis votre contexte RoomContext

  // Fonction pour supprimer la salle actuelle de l'utilisateur
  const handleDeleteRoom = () => {
    // Supprimer la salle en utilisant la fonction deleteRoom avec l'adresse actuelle de l'utilisateur
    deleteRoom(address);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {isConnected ? (
        <>
          
          <div className="flex gap-4 items-center">
            <button
              onClick={() =>
                writeContract({
                  address: '0xEa8F99779eEAd14d4575D91a2497Cfe5DDFb3b74',
                  abi: MonkeyWarsABI,
                  functionName: 'createGame',
                  args: [parseEther('0.1')],
                })
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Your Game
            </button>
            {/* Bouton "Delete my room" qui s'affiche si l'utilisateur a déjà créé une salle */}
            {rooms.some(room => room.address === address) && (
              <button
                onClick={handleDeleteRoom}
                className={'bg-red-800 text-red-100 px-4 py-2 rounded-md shadow-md duration-150'}
              >
                Delete my room
              </button>
            )}
          </div>

          <div className="mt-4">
            <h2 className="text-xl font-bold">Available Rooms:</h2>
            <ul>
              {rooms.map((room, index) => {
                // Compter le nombre d'utilisateurs présents dans la salle
                let numPlayers = 0;
                if (room.user1) numPlayers++;
                if (room.user2) numPlayers++;

                return (
                  <li key={index} className="flex items-center gap-2">
                    <Link to={`/game/${room.address}`}>{room.address}</Link>
                    <span>{`${numPlayers}/2`}</span>
                  </li>
                );
              })}
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
