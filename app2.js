var dotenv = require('dotenv'),
	express = require("express"),
	handlebars = require("express3-handlebars"),
	Crawler = require("crawler").Crawler,
	robots = require('robots'),
	colors = require('colors'),
	icon = require('log-symbols'),
	// async = require('async'),
	rparser = new robots.RobotsParser(),
	sitemapper = new require('sitemapper'),
	sitemaps = [],
	sites = [],
	children = [],
	cp = require('child_process');

//set theme colors
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

//number of crawlers to use. More crawlers uses more resources and 
var NUMBER_OF_CRAWLERS = 3;

//for calculating total time
var start = new Date();
var end = new Date();


//TODO
//if we want to see results from a broser

dotenv.load();
//express
var app = express();
app.engine('html', handlebars({extname:'.html', defaultLayout: 'main'}));
app.set('view engine', 'html');
app.set('port', process.env.PORT);




//robots.txt of the site
var domain = 'www.abt.com';
var robots_url =  'http://'+domain+'/robots.txt';

rparser.setUrl(robots_url, function(parser, success){
	console.log(icon.info, "Robots.txt URL:", robots_url)
	if(success){
		parser.getSitemaps(function(sitemaps)
		{
			console.log("Sitemap URL(s):", sitemaps);
			//get only the first sitemap if there is a list
			sitemapper.getSites(sitemaps[0], function(err, sites){
				sites = sites.filter(function(e){
					//Regex to filter only valid urls; return true to crawl
					return (e.match(/http(s)?:\/\/((www|.+)\.)?abt\.com\/product/)) ? true: false;
				});
				//crawler information
				console.log("# of sitemap sites: ", ("" + sites.length).info);
				console.log("# of crawlers     : ", ("" + NUMBER_OF_CRAWLERS).info);
				var incr = Math.round(sites.length/NUMBER_OF_CRAWLERS);
				console.log("sites per crawler : ", ("" + incr).info);

				//spawn child crawlers
				for(var i=0; i<NUMBER_OF_CRAWLERS;i++){
					console.log('\r\n\r\nSpawning crawler for sites:', ((i*incr+1) +"-" + (i*incr+incr)).info);

					//create a thread for the each child with the 'spider.js' code
					children[i] = cp.fork(__dirname+'/spider.js', sites.slice(i*incr,i*incr+incr));
   					console.log('Crawler '+(i+1)+' spawned, pid: '+("" + children[i].pid).help);

   					//calculate time on exit
					children[i].on('exit', function (code) {
						//when crawler finishes calculate time and log to console.
						var end = new Date;
						console.log((""+end).input);
						console.log(("Total elapsed time: "+(end.getTime() - start.getTime())/1000 + "s").input);
						children[i] = undefined;
					});

				}
			})
		});
	}
});

//exit on process termination signal
process.on("SIGTERM", function() {
   console.log("Parent SIGTERM detected");
   // exit cleanly
   process.exit();
});

