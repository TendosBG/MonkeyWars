import React, { createContext, useContext, useState } from 'react';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);

  const addRoom = (room) => {
    setRooms(prevRooms => [...prevRooms, room]);
  };

  return (
    <RoomContext.Provider value={{ rooms, addRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  return useContext(RoomContext);
};
