import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { MonkeyWarsABI } from '../abi.ts';
import {  useWriteContract } from 'wagmi';

const Game = () => {
  const { address } = useParams();
  const { isConnected, address: playerAddress } = useWallet();
  const navigate = useNavigate();
  const [player2Address, setPlayer2Address] = useState(null);
  const { writeContract, error} = useWriteContract()
console.log(error)

    

  useEffect(() => {
    if (!isConnected) {
      navigate('/');
      return;
    }

    const roomRef = db.ref('rooms').child(address);

    // Ajouter le joueur à la salle lorsque le composant est monté
    roomRef.once('value', (snapshot) => {
      if (!snapshot.exists()) {
        roomRef.set({
          address: address,
          user1: {
            address: playerAddress,
            // Ajouter d'autres données utilisateur si nécessaire
          },
          user2: null,
          // Ajouter d'autres données de salle si nécessaire
        });
      } else {
        const roomData = snapshot.val();
        if (!roomData.user1) {
          roomRef.update({
            user1: {
              address: playerAddress,
              // Ajouter d'autres données utilisateur si nécessaire
            },
          });
        } else if (!roomData.user2 && roomData.user1.address !== playerAddress) {
          roomRef.update({
            user2: {
              address: playerAddress,
              // Ajouter d'autres données utilisateur si nécessaire
            },
          });
        } else if (roomData.user2 && roomData.user2.address !== playerAddress) {
          setPlayer2Address(roomData.user2.address);
        }
      }
    });

    // Supprimer le joueur de la salle lorsque le composant est démonté (unmount)
    return () => {
      if (isConnected && playerAddress) {
        roomRef.once('value', (snapshot) => {
          const roomData = snapshot.val();
          if (roomData) {
            if (roomData.user1 && roomData.user1.address === playerAddress) {
              roomRef.update({
                user1: null,
              });
            } else if (roomData.user2 && roomData.user2.address === playerAddress) {
              roomRef.update({
                user2: null,
              });
            }
          }
        });
      }
    };
  }, [isConnected, address, navigate, playerAddress]);

  useEffect(() => {
    if (!player2Address) {
      console.log(player2Address);
      writeContract({
        address: '0xE855bEa1B0289420ceE99bc9a8524c3744a4710b',
        abi: MonkeyWarsABI,
        functionName: 'createGame',
        args: [1000],
      });
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Game View</div>
      {isConnected ? (
        <div>
          <div> Game of {address}</div>
          {player2Address ? (
            <div onClick={
              () => {
                writeContract({
                  address: '0xE855bEa1B0289420ceE99bc9a8524c3744a4710b',
                  abi: MonkeyWarsABI,
                  functionName: 'startGame',
                });
              }
            }
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">Start the game</div>
          ) : (
            <div>Waiting for another player to join</div>
          )}
        </div>
      ) : (
        <div>Please connect your wallet</div>
      )}
    </div>
  );
};

export default Game;
