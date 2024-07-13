import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase';

const Game = () => {
  const { address } = useParams();
  const { isConnected, address: playerAddress } = useWallet();
  const navigate = useNavigate();
  const [player2Address, setPlayer2Address] = useState(null);

  

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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-2xl font-bold">Game View</div>
      {isConnected ? (
        <div>
          <div> Game of {address}</div>
        </div>
      ) : (
        <div>Please connect your wallet</div>
      )}
    </div>
  );
};

export default Game;
