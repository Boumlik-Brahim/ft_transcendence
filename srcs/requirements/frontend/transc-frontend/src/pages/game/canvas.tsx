import { useState, useEffect, useRef } from 'react'

interface propsType {
    socket : any,
}

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

const Canvas = ({ socket } : propsType) => {

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
        const ball_x = x * 5;
        const ball_y = y * 5;
        context.arc(ball_x, ball_y, r,  0, Math.PI * 2);
        context.fillStyle = 'black';
        context.fill();
        context.closePath();
    }

    useEffect(() => {
        if (canvasRef?.current) {
            const canvas = canvasRef.current;
            if (gameData) {
                const w : number = gameData.W_screen * 5;
                const h : number = gameData.H_screen * 5;
                canvas.width = w;
                canvas.height = h;
                const context = canvas.getContext('2d');
                if (!context) return;
                /** Draw a line */
                context.clearRect(0, 0, canvas.width, canvas.height);
                DrawHorizline(context, w / 2, 0, h);

                /** Draw a  Left Paddle line */
                
                DrawHorizline(context, 10, 20, 80);
                
                /** Draw a Rigth Paddle line */
                DrawHorizline(context, w - 10, 20, 80  );

                /** Drawn a ball */
                DrawCircle(context, gameData.ball_x, gameData.ball_y, 10);
            }
        }
    }, [gameData])

    socket.on("value", (data : GameEntity) => {
        setGamedata(data);
    })

    return (
        <canvas ref={canvasRef} style={{ border : "solid 4px "}}></canvas>
    )
}

export default Canvas