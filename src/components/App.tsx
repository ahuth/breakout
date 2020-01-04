import React, { useEffect, useRef } from 'react';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        let x = canvas.width / 2;
        let y = canvas.height - 30;

        const dx = 2;
        const dy = -2;

        const draw = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);

          context.beginPath();
          context.arc(x, y, 10, 0, Math.PI * 2);
          context.fillStyle = '#0095DD';
          context.fill();
          context.closePath();

          x += dx;
          y += dy;

          window.requestAnimationFrame(draw);
        };

        window.requestAnimationFrame(draw);
      }
    }
  }, []);

  return <canvas height={320} width={480} ref={canvasRef} />;
}
