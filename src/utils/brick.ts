type Brick = {
  status: number,
  width: number,
  x: number,
  y: number,
}

export type Type = Brick;

const brickWidth = 75;
const brickHeight = 20;

export function create(x: number, y: number, width: number): Brick {
  return { x, y, width, status: 1 };
}

export function isPresent(brick: Brick): boolean {
  return brick.status === 1;
}

export function bust(brick: Brick): Brick {
  brick.status = 0;
  return brick;
}

export function draw(brick: Brick, context: CanvasRenderingContext2D): void {
  if (isPresent(brick)) {
    context.beginPath();
    context.rect(brick.x, brick.y, brickWidth, brickHeight);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
  }
}
