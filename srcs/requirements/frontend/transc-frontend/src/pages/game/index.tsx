import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";

interface GameEntity {
    W_screen : number,
    H_screen : number,
    ball_x : number,
    ball_y : number,
    vx : number,
    vy : number,
    paddle1_x : number,
    paddle2_x : number,
    paddle1_y : number,
    paddle2_y : number,
    w_paddle : number,
    h_paddle : number,
    playerSpeed : number,
}


export const Game  = () => {
    const [gameData, setGamedata] = useState<GameEntity>();
    const canvasRef = useRef(null)
    useEffect (() => {
        socket.emit('isPlaying')
    }, [])

    socket.on("value", (data) => {
        setGamedata(data);
    })
    console.log(socket.connected)
    return (
        <div>
            <p>{gameData?.ball_x}</p>
            <canvas className="canva" ref={canvasRef} style={{ border : "1px solid black"}} />
        </div>
    )
}