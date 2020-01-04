import React, { useEffect, useRef } from 'react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');

      if (context) {
        context.beginPath();
        context.rect(20, 40, 50, 50);
        context.fillStyle = '#FF0000';
        context.fill();
        context.closePath();

        context.beginPath();
        context.arc(240, 160, 20, 0, Math.PI * 2, false);
        context.fillStyle = 'green';
        context.fill();
        context.closePath();
      }
    }
  }, []);

  return <canvas height={320} width={480} ref={canvasRef} />;
}
