import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import Canvas from "./canvas";


export const Game  = () => {

    const [error, setError] = useState<string>();
    const [gameId, setgameId] = useState<string>();
    const [myid, setMyId] = useState<string>();
    
    useEffect (() => {
        socket.emit('isPlaying')
    }, []);

    const create = () => {
        const creatorID = "064f8d07-7a1e-45cc-844d-3106548484c1";
        const invitedName = "d65b3199-89cd-4824-aa3d-45aea1109c93"
        socket.emit('createGame', {creatorID, invitedName})
    }

    const joinGame = () => {
        console.log(gameId, myid)
       socket.emit('joinGame', {
        userId : myid,
        gameID : gameId
    })
    }

    socket.on('error', (error) => {
        console.log(error)
        setError(error);
    })


    console.log(socket.connected)

    return (
        <div>
            <button onClick={create}>CreateNewGame</button>
            {/* <p>{error}</p> */}
            <Canvas socket={socket} myId={myid || "none"} gameId={gameId || "none"} ></Canvas>
            <form>
                <input onChange={(e) => setgameId(e.target.value)}></input><br/>
                <input onChange={(e) => setMyId(e.target.value)}></input><br/>
            </form>
            <button onClick={joinGame}>join a game</button>
        </div>
    )
}