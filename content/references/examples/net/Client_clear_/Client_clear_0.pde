// Creates a client that listens for input until it gets a 
// linefeed and then throws the rest of the input away.

import processing.net.*; 
Client myClient; 
String inString;
byte interesting = 10;

void setup() { 
  size (300, 100);
  // Connect to the local machine at port 10002.
  // This example will not run if you haven't
  // previously started a server on this port.
  myClient = new Client(this, "127.0.0.1", 10002); 
} 

void draw() { 
  if (myClient.available() > 0) { 
    background(0); 
    // Read input until we get a byte of value 10 (ASCII linefeed):
    inString = myClient.readStringUntil(interesting); 
    println(inString); 
    // Throw away the rest of the input:
    myClient.clear();
  }
} 

