import * as Brick from './brick';

type Wall = Brick.Type[];

export type Type = Wall;

export function create(
  rows: number,
  cols: number,
  brickWidth: number,
  brickHeight: number,
  padding: number,
  offsetTop: number,
  offsetLeft: number,
): Wall {
  const bricks: Brick.Type[] = [];

  for (let c = 0; c < cols; c++) {
    for (let r = 0; r < rows; r++) {
      const brickX = (c * (brickWidth + padding)) + offsetLeft;
      const brickY = (r * (brickHeight + padding)) + offsetTop;

      bricks.push(Brick.create(brickX, brickY, brickHeight, brickWidth));
    }
  }

  return bricks;
}

export function forEachBrick(wall: Wall, callback: (brick: Brick.Type) => void): void {
  wall.forEach(function (brick) {
    callback(brick);
  });
}

export function draw(wall: Wall, context: CanvasRenderingContext2D): void {
  forEachBrick(wall, function (brick) {
    Brick.draw(brick, context);
  });
}
