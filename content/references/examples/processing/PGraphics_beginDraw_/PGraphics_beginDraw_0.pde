PGraphics pg;

void setup() {
  size(100, 100);
  pg = createGraphics(80, 80, P2D);
  pg.beginDraw();
  pg.background(102);
  pg.stroke(255);
  pg.line(20, 20, 80, 80);
  pg.endDraw();
  noLoop();
}

void draw() {
  image(pg, 10, 10); 
}

