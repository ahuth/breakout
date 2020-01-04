import React, { useRef } from 'react';
import useGame from '../hooks/useGame';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGame(canvasRef);

  return <canvas height={320} width={480} ref={canvasRef} />;
}
