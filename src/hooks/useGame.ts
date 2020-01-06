import React, { useEffect } from 'react';

export default function useGame(canvasRef: React.RefObject<HTMLCanvasElement>): void {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    let animationFrameId = -1;

    let rightPressed = false;
    let leftPressed = false;

    let x = canvas.width / 2;
    let y = canvas.height - 30;

    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;

    const ballRadius = 10;
    let dx = 2;
    let dy = -2;

    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;

    const bricks: Array<Array<{ x: number, y: number}>> = [];

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = true;
      }
      else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Right' || e.key === 'ArrowRight') {
        rightPressed = false;
      }
      else if (e.key === 'Left' || e.key === 'ArrowLeft') {
        leftPressed = false;
      }
    };

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const b = bricks[c][r];
          if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
            dy = -dy;
          }
        }
      }
    };

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

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          context.beginPath();
          context.rect(brickX, brickY, brickWidth, brickHeight);
          context.fillStyle = '#0095DD';
          context.fill();
          context.closePath();
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      drawBall();
      drawPaddle();
      drawBricks();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }

      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
        }
        else {
          window.clearInterval(animationFrameId);
          alert('GAME OVER');
          document.location.reload();
        }
      }

      x += dx;
      y += dy;

      if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
          paddleX = canvas.width - paddleWidth;
        }
      } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
          paddleX = 0;
        }
      }

      animationFrameId = window.requestAnimationFrame(draw);
    };

    document.addEventListener('keydown', handleKeyDown, false);
    document.addEventListener('keyup', handleKeyUp, false);

    animationFrameId = window.requestAnimationFrame(draw);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, false);
      document.removeEventListener('keyup', handleKeyUp, false);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef]);
}
