import { io } from 'socket.io-client';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const URL = `${process.env.NEXT_PUBLIC_APP_URI}/game`

// export const socket = io(URL, {
//     autoConnect : false,
//     // auth: { userId: cookies.get('id') }
// });

// export const socketNotification = io("http://localhost:3000", {
//     autoConnect : false,
//     auth: { userId: cookies.get('id') }
// });
