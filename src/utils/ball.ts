type Ball = {
  dx: number,
  dy: number,
  radius: number,
  x: number,
  y: number,
}

export type Type = Ball;

const radius = 10;

export function create(x: number, y: number): Ball {
  return {
    x, y, dx: 2, dy: -2, radius,
  };
}

export function move(ball: Ball): Ball {
  return {
    ...ball,
    x: ball.x += ball.dx,
    y: ball.y += ball.dy,
  };
}

export function bounceX(ball: Ball): Ball {
  return {
    ...ball,
    dx: ball.dx *= -1,
  };
}

export function bounceY(ball: Ball): Ball {
  return {
    ...ball,
    dy: ball.dy *= -1,
  };
}

export function draw(ball: Ball, context: CanvasRenderingContext2D): void {
  context.beginPath();
  context.arc(ball.x, ball.y, radius, 0, Math.PI * 2);
  context.fillStyle = '#0095DD';
  context.fill();
  context.closePath();
}
