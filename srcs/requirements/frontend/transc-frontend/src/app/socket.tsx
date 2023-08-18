// SocketContext.js
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'universal-cookie';



const gameURL = `${process.env.NEXT_PUBLIC_APP_URI}/game`

const cookies = new Cookies;

const gameIO = io(gameURL, {
  auth: { userId: cookies.get('id') }
});
const SocketContext = createContext<Socket>(gameIO);

interface Props {
    children : React.ReactNode
}

export function SocketProvider({ children } : Props) {

  const [gameSocket, setGameSocket] = useState<Socket>(gameIO);

  useEffect(() => {
    gameIO.connect();
    setGameSocket(gameIO);
    return () => {
        gameIO.disconnect();
    };
  }, [gameIO.connected]);

  return (
    <SocketContext.Provider value={gameSocket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
