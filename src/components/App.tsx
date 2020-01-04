import React, { useRef } from 'react';

export default function App() {
  const canvasRef = useRef(null);
  return <canvas height={320} width={480} ref={canvasRef} />;
}
