import { io } from 'socket.io-client';
const URL = "http://10.13.1.4:3000/game"
export const socket = io(URL, {
    autoConnect : false
});