import { useEffect, useRef } from "react";
import { socket } from "./socket";
import Canvas from "./canvas";


export const Game  = () => {
    useEffect (() => {
        socket.emit('isPlaying')
    }, [])
    console.log(socket.connected)
    return (
        <div>
            <Canvas socket={socket}></Canvas>
        </div>
    )
}