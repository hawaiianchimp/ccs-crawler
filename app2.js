var dotenv = require('dotenv'),
	express = require("express"),
	handlebars = require("express3-handlebars"),
	Crawler = require("crawler").Crawler;

dotenv.load();

var app = express();

app.engine('html', handlebars({extname:'.html', defaultLayout: 'main'}));
app.set('view engine', 'html');

app.set('port', process.env.PORT);
console.log("running");
var c = new Crawler({
	"maxConnections": 10,
	"debug": true,
	"callback": function (error,result,$){
		$("a").each(function(i,a){
			if(a.href.match(/seantburke.com/))
			{
				console.log(a.href);
				c.queue(a.href);
			}
		});
	}
});
sites = ['http://www.seantburke.com/location.php'];
c.queue(sites);
console.log("starting crawler");
