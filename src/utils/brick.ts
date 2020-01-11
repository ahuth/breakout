type Brick = {
  height: number,
  status: number,
  width: number,
  x: number,
  y: number,
}

export type Type = Brick;

export function create(x: number, y: number, height: number, width: number): Brick {
  return { x, y, height, width, status: 1 };
}

export function isPresent(brick: Brick): boolean {
  return brick.status === 1;
}

export function bust(brick: Brick): Brick {
  return {
    ...brick,
    status: 0,
  };
}

export function draw(brick: Brick, context: CanvasRenderingContext2D): void {
  if (isPresent(brick)) {
    context.beginPath();
    context.rect(brick.x, brick.y, brick.width, brick.height);
    context.fillStyle = '#0095DD';
    context.fill();
    context.closePath();
  }
}
