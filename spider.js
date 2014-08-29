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
console.log("\r\n\t",icon.success, ("Crawler " + process.argv[2] + " (" +process.pid +") started").success, "\r\n");
process.send({
         "cid": process.argv[2],
         "pid": process.pid,
         "message":"increment"
      });
//start crawler
var c = new Crawler({
   "maxConnections": 10,
   "debug": false,
   "cache": false,
   "timeout": 5000,
   "skipDuplicates": false,
   "onDrain": function(){
      //exit process when crawler finishes queue
      process.send({
         "cid": process.argv[2],
         "pid": process.pid,
         "message":"empty"
      });
   },
   "callback": function (error,result,$){
      //use selectors to grab info off page the website in this loop
      if(!error)
      {
         console.info(("GET "+result.window.location.href).input);
         if($)
         {
            var price = (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null;
            console.log("Price: $%d".warn,price);
         }
      }
      else
      {
         console.error(("" + error).error);
      }
   }
});

process.on("message", function(data){
   //queue the sites from the message passed
   if(data.message == "queue")
   {
      c.queue(data.site);
      console.log(("Crawler(" + process.pid + "): Queued site " + data.site).info);
   }
   else if(data.message == "die")
   {
      process.exit();
   }
});

// detect and report if this child exited
process.on("exit", function() {
   //print to console
   process.send({
         "cid": process.argv[2],
         "pid": process.pid,
         "message":"decrement"
      });
   console.log("\r\n\t",icon.success, ("Crawler "+ process.argv[2] + " ("+ process.pid +") finished").success, "\r\n");
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