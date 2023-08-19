'use client'
import React, { useEffect, useRef } from 'react'
import { Context } from 'react-responsive'
import Cookies from 'universal-cookie'

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
  winner : null | String
}

interface Player {
  id : String,
  paddleX : number,
  paddleY : number,
  score : number
}

interface PropsType {
  gameData : GameEntity | undefined;
  gameState : string | undefined
}

const cookie = new Cookies();


const Canvas = ({ gameData, gameState } : PropsType) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const convertValueX = (gamePoint : number, canvasValue : number, gameValue : number) : number => {
    const t = ((canvasValue) / gameValue);
    return t * gamePoint
  }

  const drawBall = (context : any, r : number, x : number, y : number) => {
    context.beginPath();
    context.fillStyle = "#3E3B6A"
    context.arc(x, y, r, 0, 2 * Math.PI)
    context.fill();
    // context.closePath();
  };

  const writeScore = (context : any, x : number, score1 : number) => {
    context.font = "20px Arial";
    context.textAlign = 'center'
    context.globalAlpha = 0.3
    const text = score1.toString();
    const y = 26;
    context.fillText(text, x, y);

  }

  const writeText = (context : any, w : number, h : number) => {
    if (gameState === 'finished' || gameState === 'canceled')
    {
      const y : number = h / 2;
      const userId : string = cookie.get('id');
      const x = gameData?.player1.id === userId ? (w / 4) : ((3 * w) / 4);
      const text : string = userId === gameData?.winner ? "WIN" : (gameData?.winner ? "LOST" : "DRAW")
      context.fillStyle = "#3E3B6A"
      context.font = "50px Arial";
      context.textAlign = 'center';
      context.fillText(text, x, y);
    }
  }

  // const replayButton = (context: any, w: number, h: number) => {
  //   if (gameState === 'finished' || gameState === 'canceled') {
  //       const y: number = ((3 * h) / 4);
  //       const userId: string = cookie.get('id');
  //       const x = gameData?.player1.id === userId ? (w / 4) : ((3 * w) / 4);
  //       const text = "Play Again";
  //       const buttonColor = "#3E3B6A"; // Color for both text and border
  //       const borderRadius = 10; // Radius of the button corners

  //       // Draw border
  //       context.strokeStyle = buttonColor;
  //       context.lineWidth = 2;
  //       context.fillStyle = 'transparent'; // No background color
  //       context.beginPath();
  //       context.moveTo(x - w / 8, y - h / 8 + borderRadius);
  //       context.lineTo(x + w / 8, y - h / 8 + borderRadius);
  //       context.arcTo(x + w / 8, y - h / 8, x + w / 8 - borderRadius, y - h / 8, borderRadius);
  //       context.lineTo(x - w / 8 + borderRadius, y - h / 8);
  //       context.arcTo(x - w / 8, y - h / 8, x - w / 8, y - h / 8 + borderRadius, borderRadius);
  //       context.closePath();
  //       context.stroke();

  //       // Draw text
  //       context.fillStyle = buttonColor;
  //       context.font = "10px Arial";
  //       context.textAlign = 'center';
  //       context.fillText(text, x, y);
  //   }
  // }

  const drawMiddleLine = (context : any, w : number, h : number) => {
    context.strokeStyle = "white"
    context.lineWidth = 4;
    context.setLineDash([5, 3])
    context.beginPath();
    context.moveTo(w / 2, 0);
    context.lineTo(w/2, h);
    context.stroke();
    // context.closePath();
  }
  
  const drawPaddle = (context : any, x : number, y : number, h : number, w : number) => {
    context.fillStyle = "#3E3B6A"
    context.beginPath();
    context.roundRect(x, y, w, h);
    context.fill();
    // context.closePath();
  }

  const drawGame = (context : any, canvas : any) => {
    const w = canvas.width;
    const h = canvas.height;
    if (!gameData) return ;
    const ballX = convertValueX(gameData.ball_x, w, gameData.W_screen);
    const bally = convertValueX(gameData.ball_y, h, gameData.H_screen);
    const w_paddle = convertValueX(gameData.w_paddle, w, gameData.W_screen);
    const radius = gameData.radius;
    const player1_X = convertValueX(gameData.player1.paddleX, w, gameData.W_screen);
    const player1_Y = convertValueX(gameData.player1.paddleY, h, gameData.H_screen);
    const player2_X = convertValueX(gameData.player2.paddleX, w, gameData.W_screen);
    const player2_Y = convertValueX(gameData.player2.paddleY, h, gameData.H_screen);
    const paddleH = convertValueX(gameData.h_paddle, h, gameData.H_screen);
    const score1 = gameData.player1.score;
    const score2 = gameData.player2.score;

    drawMiddleLine(context, w, h);
    drawBall(context, radius, ballX, bally)
    drawPaddle(context, player1_X, player1_Y, paddleH, w_paddle);
    drawPaddle(context, player2_X, player2_Y, paddleH, w_paddle);
    writeScore(context, w / 2 - 40, score1);
    writeScore(context, w / 2 + 40, score2);
    // writeText(context, w, h);
    // replayButton(context, w, h)
    context.globalAlpha = 1
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
  }, [gameData, gameState]);

  return (
    <canvas ref={canvasRef} className=' w-full border h-full rounded-lg shadow  '></canvas>
  );
}

export default Canvas