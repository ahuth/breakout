import React, { useEffect } from 'react';
import * as Ball from '../utils/ball';

export default function useGame(canvasRef: React.RefObject<HTMLCanvasElement>): void {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;
    let ball = Ball.create(canvas.width / 2, canvas.height - 30);

    let animationFrameId = -1;

    let rightPressed = false;
    let leftPressed = false;

    const paddleHeight = 10;
    const paddleWidth = 75;
    let paddleX = (canvas.width - paddleWidth) / 2;

    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;

    const bricks: Array<Array<{ x: number, y: number, status: number}>> = [];

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
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
          if (b.status === 1) {
            if (ball.x > b.x && ball.x < b.x + brickWidth && ball.y > b.y && ball.y < b.y + brickHeight) {
              ball = Ball.bounceY(ball);
              b.status = 0;
            }
          }
        }
      }
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
          if (bricks[c][r].status === 1) {
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
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      Ball.draw(ball, context);
      drawPaddle();
      drawBricks();
      collisionDetection();

      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball = Ball.bounceX(ball);
      }

      if (ball.y + ball.dy < ball.radius) {
        ball = Ball.bounceY(ball);
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
          ball = Ball.bounceY(ball);
        } else {
          window.clearInterval(animationFrameId);
          alert('GAME OVER');
          document.location.reload();
        }
      }

      ball = Ball.move(ball);

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
