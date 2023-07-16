'use client'
import React, { useEffect, useRef } from 'react'


interface GameEntity {
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
  ball_speed : number,
  gameStatus : null | 'waiting' | 'started' | 'finished' | 'canceled',
  winner : null | String
}

interface Player {
  id : String,
  paddleX : number,
  paddleY : number,
  score : number
}

interface PropsType {
  gameData : GameEntity | undefined
}


const Canvas = ({ gameData } : PropsType) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const convertValueX = (gamePoint : number, canvasValue : number, gameValue : number) : number => {
    return ((gamePoint * canvasValue) / gameValue);
  }

  const drawBall = (context : any, r : number, x : number, y : number) => {
    context.beginPath();
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.fill();
  };

  const drawMiddleLine = (context : any, w : number, h : number) => {
    context.beginPath();
    context.moveTo(w / 2, 0);
    context.lineTo(w/2, h);
    context.stroke();
  }
  
  const drawPaddle = (context : any, x : number, y : number, h : number) => {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, h + y);
    context.stroke();
  }

  const drawGame = (context : any, canvas : any) => {
    const w = canvas.width;
    const h = canvas.height;
    if (!gameData) return ;
    const ballX = convertValueX(gameData.ball_x, w, gameData.W_screen);
    const bally = convertValueX(gameData.ball_y, h, gameData.H_screen);
    const radius = gameData.radius;
    const player1_X = convertValueX(gameData.player1.paddleX, w, gameData.W_screen);
    const player1_Y = convertValueX(gameData.player1.paddleY, h, gameData.H_screen);
    const player2_X = convertValueX(gameData.player2.paddleX, w, gameData.W_screen);
    const player2_Y = convertValueX(gameData.player2.paddleY, h, gameData.H_screen);
    const paddleH = convertValueX(gameData.h_paddle, h, gameData.H_screen);

    drawMiddleLine(context, w, h);
    drawBall(context, radius, ballX, bally)
    drawPaddle(context, player1_X, player1_Y, paddleH);
    drawPaddle(context, player2_X, player2_Y, paddleH);
  }

  useEffect(() => {
    if (canvasRef) {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvasRef.current.getContext('2d');
        if (context) {
          context.clearRect(0, 0, canvas.width, canvas.height);
          drawGame(context, canvas);
        }
      }
    }
  }, [gameData]);

  return (
    <canvas ref={canvasRef} className=' border-4 w-full h-full '></canvas>
  );
}

export default Canvas