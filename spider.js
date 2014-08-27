var Crawler = require("crawler").Crawler
   colors = require('colors'),
   icon = require('log-symbols');


//set console colors
colors.setTheme({
   silly: 'rainbow',
   input: 'grey',
   verbose: 'cyan',
   prompt: 'grey',
   info: 'blue',
   success: 'green',
   data: 'grey',
   help: 'cyan',
   warn: 'yellow',
   debug: 'blue',
   error: 'red'
});

//console log start

process.on("message", function(data){
   console.log("\r\n\r\n" + icon.success, ("Crawler " + process.pid +" started").success);

   //start crawler
   var c = new Crawler({
      "maxConnections": 10,
      "debug": true,
      "cache": false,
      "skipDuplicates": false,
      "onDrain": function(){
         //exit process when crawler finishes queue
         process.exit();
      },
      "callback": function (error,result,$){
         //use selectors to grab info off page the website in this loop
         if($)
         {
            var price = (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null;
            console.log("Price: $%d".warn,price);
         }
      }
   });

   //queue the sites from the message passed
   c.queue(data.sites);
   console.log("Queued %d sites".info, data.sites.length);
});

// detect and report if this child exited
process.on("exit", function() {
   //print to console
   console.log(icon.success, ("Crawler "+ process.pid +" finished\r\n\r\n").success);
});
// detect and report if this child was killed
process.on("SIGTERM", function() {
   console.log(icon.error, "Crawler SIGTERM detected".error);
   process.exit();
});

//uncaught exception
process.on('uncaughtException', function(err) {
  console.log(icon.error, ("Crawler "+ process.pid +" exception: " + err).error);
});