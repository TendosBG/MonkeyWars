// RoomContext.js

import React, { createContext, useState, useEffect } from 'react';
import firebase from '../firebase/firebase';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const roomsRef = firebase.database().ref('rooms');
    roomsRef.on('value', (snapshot) => {
      const roomsData = snapshot.val();
      if (roomsData) {
        const roomsArray = Object.keys(roomsData).map((key) => ({
          id: key,
          ...roomsData[key],
        }));
        setRooms(roomsArray);
      } else {
        setRooms([]);
      }
    });

    return () => roomsRef.off();
  }, []);

  const addRoom = (room) => {
    firebase.database().ref('rooms').push(room);
  };

  const deleteRoom = (roomId) => {
    firebase.database().ref(`rooms/${roomId}`).remove();
  };

  return (
    <RoomContext.Provider value={{ rooms, addRoom, deleteRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  return React.useContext(RoomContext);
};
