import { io } from 'socket.io-client';
const URL = "http://10.13.2.5:3000/game"
export const socket = io(URL, {
    autoConnect : false
});