type Paddle = {
  width: number,
  x: number,
}

export type Type = Paddle;

const height = 10;
const width = 75;

export function create(screenWidth: number): Paddle {
  return {
    width,
    x: (screenWidth - width) / 2,
  };
}

export function moveRight(paddle: Paddle, amount: number): Paddle {
  paddle.x += amount;
  return paddle;
}

export function moveLeft(paddle: Paddle, amount: number): Paddle {
  paddle.x -= amount;
  return paddle;
}

export function setX(paddle: Paddle, x: number): Paddle {
  paddle.x = x;
  return paddle;
}

export function draw(paddle: Paddle, context: CanvasRenderingContext2D): void {
  context.beginPath();
  context.rect(paddle.x, context.canvas.height - height, width, height);
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();
}
