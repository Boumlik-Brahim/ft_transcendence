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
        const invitedId = "d65b3199-89cd-4824-aa3d-45aea1109c93";
        const isRamdomOponent = false;
        socket.emit('createGame', {creatorID, invitedId, isRamdomOponent})
    }

    const joinGame = () => {
        console.log(gameId, myid)
       socket.emit('joinGame', {
        userId : '064f8d07-7a1e-45cc-844d-3106548484c1',
        gameID : '7e0640ff-7e56-485f-94f2-b892578e6bf3',
    })
    }
    const joinGameB = () => {
        console.log(gameId, myid)
       socket.emit('joinGame', {
        userId : 'd65b3199-89cd-4824-aa3d-45aea1109c93',
        gameID : '7e0640ff-7e56-485f-94f2-b892578e6bf3',
    })
    }



    socket.on('error', (error) => {
        console.log(error)
        setError(error);
    })


    console.log(socket.connected)

    return (
        <div>
            <p></p>
            <button onClick={create}>CreateNewGame</button>
            {/* <p>{error}</p> */}
            <Canvas socket={socket} myId="d65b3199-89cd-4824-aa3d-45aea1109c93" gameId={"7e0640ff-7e56-485f-94f2-b892578e6bf3"} ></Canvas>
            <form>
                <input onChange={(e) => setgameId(e.target.value)}></input><br/>
                <input onChange={(e) => setMyId(e.target.value)}></input><br/>
            </form>
            <button onClick={joinGame}>join a game</button>
            <button onClick={joinGameB}>join a game</button>
        </div>
    )
}