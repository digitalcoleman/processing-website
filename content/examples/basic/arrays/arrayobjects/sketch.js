import p5 from 'p5';

const sketch = (s) => {
  class Module {
    constructor(xOff, yOff, x, y, speed, unit) {
      this.xOff = xOff;
      this.yOff = yOff;
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.unit = unit;
      this.xDir = 1;
      this.yDir = 1;
    }

    // Método personalizado para refrescar las variables
    update() {
      this.x = this.x + this.speed * this.xDir;
      if (this.x >= this.unit || this.x <= 0) {
        this.xDir *= -1;
        this.x = this.x + 1 * this.xDir;
        this.y = this.y + 1 * this.yDir;
      }
      if (this.y >= this.unit || this.y <= 0) {
        this.yDir *= -1;
        this.y = this.y + 1 * this.yDir;
      }
    }

    // Método personalizado para dibujar el objeto
    draw() {
      s.fill(255);
      s.ellipse(this.xOff + this.x, this.yOff + this.y, 6, 6);
    }
  }

  let unit = 40;
  let count;
  let mods = [];

  s.setup = () => {
    s.createCanvas(s.width, s.height);
    console.log('Creating canvas');
    s.noStroke();
    let wideCount = s.width / unit;
    let highCount = s.height / unit;
    count = wideCount * highCount;

    let index = 0;
    for (let y = 0; y < highCount; y++) {
      for (let x = 0; x < wideCount; x++) {
        mods[index++] = new Module(
          x * unit,
          y * unit,
          unit / 2,
          unit / 2,
          s.random(0.05, 0.8),
          unit
        );
      }
    }
  };

  s.draw = () => {
    s.background(0);
    for (let i = 0; i < count; i++) {
      mods[i].update();
      mods[i].draw();
    }
  };
};

export default sketch;
