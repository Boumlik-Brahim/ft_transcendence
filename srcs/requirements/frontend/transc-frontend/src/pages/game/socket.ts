import { io } from 'socket.io-client';

const URL ='10.11.3.4:3000';

export const socket = io(URL);