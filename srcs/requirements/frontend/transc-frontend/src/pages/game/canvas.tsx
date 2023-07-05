import { useState, useEffect, useRef } from 'react'

interface propsType {
    socket : any,
    myId : string,
    gameId : string
}

export interface GameEntity {
    id : String,
    W_screen : number,
    H_screen : number,
    ball_x : number,
    ball_y : number,
    vx : number,
    radius : number,
    vy : number,
    player1 : Player,
    player2 : Player,
    w_paddle : number,
    h_paddle : number,
    playerSpeed : number,
    scoreLimit : number,
    // gameLevel? : String,
    ball_speed : number,
    gameStatus : null | 'waiting' | 'started' | 'finished' | 'canceled' | 'inThequeue';
}

export interface Player {
    id : String,
    paddleX : number,
    paddleY : number,
    score : number
}

const Canvas = ({ socket, gameId, myId } : propsType) => {

    const [gameData, setGamedata] = useState<GameEntity>();
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const DrawHorizline = (context : any, x : number, starty : number, endy : number) => {
        context.beginPath();
        context.moveTo(x, starty)
        context.lineTo(x, endy);
        context.strokeStyle = 'black';
        context.lineWidth = 4;
        context.stroke();
        context.closePath();
    }

    const DrawCircle = (context : any, x : number, y : number, r : number) => {
        context.beginPath();
        const ball_x = x;
        const ball_y = y ;
        context.arc(ball_x, ball_y, r,  0, Math.PI * 2);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
    }

    useEffect(() => {
        if (canvasRef?.current) {
            const canvas = canvasRef.current;
            if (gameData) {
                const w : number = gameData.W_screen;
                const h : number = gameData.H_screen ;
                canvas.width = w;
                canvas.height = h;
                const context = canvas.getContext('2d');
                if (!context) return;
                /** Draw a line */
                context.clearRect(0, 0, canvas.width, canvas.height);
                DrawHorizline(context, w / 2, 0, h);

                /** Draw a  Left Paddle line */
                const paddle1 = gameData.player1.paddleY;
                const paddle2 = gameData.player2.paddleY;
                
                DrawHorizline(context, gameData.player1.paddleX, paddle1,  paddle1 + gameData.h_paddle);
                
                /** Draw a Rigth Paddle line */+

                DrawHorizline(context, gameData.player2.paddleX, paddle2 , paddle2 + gameData.h_paddle);

                /** Drawn a ball */
                DrawCircle(context, gameData.ball_x, gameData.ball_y, gameData.radius);
            }
        }
    }, [gameData]);

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") 
        {
            socket.emit("ArrowUp", {
                userId : myId,
                gameID : gameId
            });
            console.log(event.key);
        }
        if (event.key === "ArrowDown") 
        {
            socket.emit("ArrowDown", {
                userId : myId,
                gameID : gameId
            });
            console.log(event.key);
        }
    })

    socket.on("value", (data : GameEntity) => {
        setGamedata(data);
    })

    return (
        <div>
            <p>score player_1 : {gameData?.player1.score} </p>
            <p>score player_1 : {gameData?.player2.score} </p>
            <canvas ref={canvasRef} style={{ border : "solid 4px "}}></canvas>
        </div>
    )
}

export default Canvas