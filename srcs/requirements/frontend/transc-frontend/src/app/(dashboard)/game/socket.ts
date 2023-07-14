import { io } from 'socket.io-client';
const URL = "http://localhost:3000/game"
export const socket = io(URL);