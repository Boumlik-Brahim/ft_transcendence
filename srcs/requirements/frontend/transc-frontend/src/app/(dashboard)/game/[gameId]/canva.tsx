'use client'
import React, { useEffect, useRef } from 'react'

const Canvas = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawBall = (context : any, radius : number, x : number, y : number) => {
    
  }
  
  const drawPaddle = (context : any) => {

  }

  const drawGame = (context : any) => {
    
  }

  useEffect(() => {
    if (canvasRef) {
      if (canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        if (context) {
          drawGame(context);
        }
      }
    }
  }, []);

  return (
    <canvas ref={canvasRef} className='m-1 border-2 border-black'></canvas>
  );
}

export default Canvas