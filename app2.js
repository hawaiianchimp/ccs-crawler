var dotenv = require('dotenv'),
	express = require("express"),
	handlebars = require("express3-handlebars"),
	Crawler = require("crawler").Crawler,
	robots = require('robots'),
	// async = require('async'),
	rparser = new robots.RobotsParser(),
	sitemapper = new require('sitemapper'),
	sitemaps = [],
	sites = [],
	rtimeout = 200,
	cp = require('child_process');

var NUMBER_OF_CRAWLERS = 20;

var start = new Date();
var end = new Date();
dotenv.load();
//express
var app = express();
app.engine('html', handlebars({extname:'.html', defaultLayout: 'main'}));
app.set('view engine', 'html');
app.set('port', process.env.PORT);


//robots.txt
var domain = 'www.abt.com';
var robots_url =  'http://' + domain +'/robots.txt';

console.log("setting sites")
rparser.setUrl(robots_url, function(parser, success){
	console.log("setting URL:", robots_url)
	if(success){
		console.log(success);
		parser.getSitemaps(function(sitemaps)
		{
			console.log("getting sitemaps:", sitemaps);
			sitemaps = sitemaps;
			console.log(sitemaps[0]);
			sitemapper.getSites(sitemaps[0], function(err, sites){
				sites = sites.filter(function(e){
					return (e.match(/http(s)?:\/\/((www|.+)\.)?abt\.com\/product/)) ? true: false;
				});

				console.log("# of sitemap sites: ", sites.length);
				console.log(sites);
				var incr = (sites.length/NUMBER_OF_CRAWLERS);
				console.log(incr)
				for(var i=0; i<sites.length;i+=incr){
					console.log(i," - ",i+incr-1);
					var spider = cp.fork(__dirname+'/spider.js', sites.slice(i,i+incr-1));
				}
				//var spider = spawn('node', ['spider.js', "http://www.seantburke.com/"]);
			})
		});
		console.log(rtimeout);
	}
});

