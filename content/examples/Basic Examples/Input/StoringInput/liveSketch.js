// This needs to be resolved
// https://github.com/lmccart/p5.js/issues/406

// /**
//  * Storing Input.
//  *
//  * Move the mouse across the screen to change the position
//  * of the circles. The positions of the mouse are recorded
//  * into an array and played back every frame. Between each
//  * frame, the newest value are added to the end of each array
//  * and the oldest value is deleted.
//  */

function runLiveSketch(s) {
  var num = 60;
  var mx = [];
  var my = [];

  s.setup = () => {
    s.createCanvas(640, 360);
    s.noStroke();
    s.fill(255, 153);
    for (var i = 0; i < num; i++) {
      mx[i] = 0;
      my[i] = 0;
    }
  };

  var prev = 0;

  s.draw = () => {
    s.background(51);

    var diff = s.frameCount - prev;

    // Cycle through the array, using a different entry on each frame.
    // Using modulo (%) like this is faster than moving all the values over.
    var which = s.frameCount % num;
    mx[which] = s.mouseX;
    my[which] = s.mouseY;

    var count = 0;
    for (var i = 0; i < num; i++) {
      // which+1 is the smallest (the oldest in the array)
      var index = (which + 1 + i) % num;
      s.ellipse(mx[index], my[index], i, i);
    }

    prev = s.frameCount;
  };
}
