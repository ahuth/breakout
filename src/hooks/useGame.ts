import React, { useEffect } from 'react';
import * as Ball from '../utils/ball';
import * as Brick from '../utils/brick';
import * as Paddle from '../utils/paddle';

export default function useGame(canvasRef: React.RefObject<HTMLCanvasElement>): void {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    let ball = Ball.create(canvas.width / 2, canvas.height - 30);
    let paddle = Paddle.create(canvas.width);

    let animationFrameId = -1;

    let rightPressed = false;
    let leftPressed = false;

    let brickRowCount = 3;
    let brickColumnCount = 5;
    let brickWidth = 75;
    let brickHeight = 20;
    let brickPadding = 10;
    let brickOffsetTop = 30;
    let brickOffsetLeft = 30;

    const bricks: Array<Array<Brick.Type>> = [];

    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        const brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        const brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;

        bricks[c][r] = Brick.create(brickX, brickY, brickWidth);
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
          let brick = bricks[c][r];
          if (Brick.isPresent(brick)) {
            if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brickHeight) {
              ball = Ball.bounceY(ball);
              brick = Brick.bust(brick);
            }
          }
        }
      }
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          Brick.draw(bricks[c][r], context);
        }
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      Ball.draw(ball, context);
      Paddle.draw(paddle, context);
      drawBricks();
      collisionDetection();

      if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball = Ball.bounceX(ball);
      }

      if (ball.y + ball.dy < ball.radius) {
        ball = Ball.bounceY(ball);
      } else if (ball.y + ball.dy > canvas.height - ball.radius) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
          ball = Ball.bounceY(ball);
        } else {
          window.clearInterval(animationFrameId);
          alert('GAME OVER');
          document.location.reload();
        }
      }

      ball = Ball.move(ball);

      if (rightPressed) {
        paddle = Paddle.moveRight(paddle, 7);

        if (paddle.x + paddle.width > canvas.width) {
          paddle = Paddle.setX(paddle, canvas.width - paddle.width);
        }
      } else if (leftPressed) {
        paddle = Paddle.moveLeft(paddle, 7);

        if (paddle.x < 0) {
          paddle = Paddle.setX(paddle, 0);
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
