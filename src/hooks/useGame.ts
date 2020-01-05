import React, { useEffect } from 'react';

export default function useGame(canvasRef: React.RefObject<HTMLCanvasElement>): void {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    let x = canvas.width / 2;
    let y = canvas.height - 30;

    const paddleHeight = 10;
    const paddleWidth = 75;
    const paddleX = (canvas.width - paddleWidth) / 2;

    const ballRadius = 10;
    let dx = 2;
    let dy = -2;

    const drawBall = () => {
      context.beginPath();
      context.arc(x, y, ballRadius, 0, Math.PI * 2);
      context.fillStyle = '#0095DD';
      context.fill();
      context.closePath();
    };

    const drawPaddle = () => {
      context.beginPath();
      context.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
      context.fillStyle = '#0095DD';
      context.fill();
      context.closePath();
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawBall();
      drawPaddle();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
      }

      x += dx;
      y += dy;

      window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
  }, [canvasRef]);
}
