import processing.sound.*;
AudioIn in;

void setup() {
  size(640, 360);
  background(255);
    
  // Create the Input stream
  in = new AudioIn(this, 0);
  in.play();
  in.amp(0.5);
}      

void draw() {
}

