import React, { useEffect, useRef } from 'react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) { return; }
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context ) { return; }

    let x = canvas.width / 2;
    let y = canvas.height - 30;

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

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();

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
  }, []);

  return <canvas height={320} width={480} ref={canvasRef} />;
}
