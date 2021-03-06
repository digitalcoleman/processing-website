import processing.sound.*;

WhiteNoise noise;
BandPass bandPass;

float amp=0.0;

void setup() {
  size(640,360);
  background(255);
    
  // Create a noise generator and a bandpass filter
  noise = new WhiteNoise(this);
  bandPass = new BandPass(this);
    
  noise.play(0.5);
  bandPass.process(noise, 100, 50);
}      

void draw() {
}
