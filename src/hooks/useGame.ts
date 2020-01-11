import React, { useEffect } from 'react';
import * as Ball from '../utils/ball';
import * as Brick from '../utils/brick';
import * as Paddle from '../utils/paddle';
import * as Wall from '../utils/wall';

export default function useGame(canvasRef: React.RefObject<HTMLCanvasElement>): void {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext('2d')!;

    let ball = Ball.create(canvas.width / 2, canvas.height - 30);
    let paddle = Paddle.create(canvas.width);
    let wall = Wall.create(3, 5, 75, 20, 10, 30, 30);

    let animationFrameId = -1;

    let rightPressed = false;
    let leftPressed = false;

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
      wall = Wall.mapBricks(wall, function (brick) {
        if (Brick.isPresent(brick)) {
          if (ball.x > brick.x && ball.x < brick.x + brick.width && ball.y > brick.y && ball.y < brick.y + brick.height) {
            ball = Ball.bounceY(ball);
            brick = Brick.bust(brick);
          }
        }
        return brick;
      });
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      Ball.draw(ball, context);
      Paddle.draw(paddle, context);
      Wall.draw(wall, context);

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
