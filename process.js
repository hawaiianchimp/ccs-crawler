NUMBER_OF_LOOPS = 10;
LOOP_SLEEP_TIME = 10;

var child_loop = function() {
   // report the current loop
   console.log("Child loop: "+NUMBER_OF_LOOPS);
 
   // to simulate the child exiting itself without just running
   // out of program, if we have completed the desired number of
   // loops, exit this process
   if( NUMBER_OF_LOOPS < 0 ) {
      console.log("Child finished loop");
      process.exit();
   }
 
   // sleep for a bit, then continue through the loops
   setTimeout(function() { child_loop() }, LOOP_SLEEP_TIME);
   NUMBER_OF_LOOPS--;
}
 
// start the loop
child_loop();

// detect and report if this child exited
process.on("exit", function() {
   console.log("Child exiting");
});
// detect and report if this child was killed
process.on("SIGTERM", function() {
   console.log("Child SIGTERM detected");
   process.exit();
});