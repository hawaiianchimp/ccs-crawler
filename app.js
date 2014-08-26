var dotenv = require('dotenv'),
	express = require("express"),
	handlebars = require("express3-handlebars"),
	Crawler = require("crawler").Crawler,
	robots = require('robots'),
	rparser = new robots.RobotsParser(),
	sitemapper = new require('sitemapper'),
	sitemaps = [],
	sites = [],
	rtimeout = 200;

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
var c = new Crawler({
			"maxConnections": 10,
			"debug": true,
			"cache": false,
			"skipDuplicates": false,
			"onDrain": function(){
				end = new Date();
				console.log("Start Time: ", start);
				console.log("  End Time: ", end);
				console.log("Total Time: ", end.getTime() - start.getTime());
			},
			"callback": function (error,result,$){
				if($)
				{
					// $("a").each(function(i,a){
					// 	if(a.href.match(/http(s)?:\/\/((www|.+)\.)?abt\.com\/product/) && !a.href.match(/(#|\?|mailto|pdf|javascript)/))
					// 	{
					// 		console.log(a.href);
					// 		c.queue(a.href);
					// 	}
					// });

						// var c,s,t,p,u,a,i,y,temp;
						// ccs_cc_pi_args = {};
						// if(s=(c=(temp=$("#cnet-content-solutions")) ? temp.prev():null) ? c.text().match(/\['(\w+)', '(\w+)']/g): null)
						// {
						// 	Array.prototype.forEach.call(s, function(el,i,array){ 
						// 		t = el.match(/\['(\w+)', '(\w+)']/);
						// 		ccs_cc_pi_args[t[1]] = t[2];
						// 	});
						// }
						// var adapter= {
						// 	           SKey: 'a62b622d', 	//subscriber key
						// 	      ProductId: ccs_cc_pi_args['cpn'], //product number
						// 	       SMfgName: ccs_cc_pi_args['mf'] || ((temp=$("[itemscope] [itemprop='manufacturer'] [itemprop='name']")).length) ? temp.attr("content"):null, //manufacturer name
						// 	         SMfgPn: ccs_cc_pi_args['pn'] || ((temp=$("[itemtype$='Product'] [itemprop='model']")).length) ? temp.attr("content"):null,  //manufacturer part number
						// 	      CatalogId: ccs_cc_pi_args['ccid'], //Catalog ID
						// 	           LCID: ccs_cc_pi_args['lang'],  //Locale ID, language
					 //                 Market: ccs_cc_pi_args['market'],  //market of product, 2 letter region code
						// 	        SEanUpc: ccs_cc_pi_args['upcean'],  //UPC/EAN code
						// 	          SkuId: null, 	//sku number CNET SKU ID (CDSID)
						// 	            upc: (u=(((temp=$("[itemtype$='Product'] [itemprop='productID']")).length)?temp.attr("content").match(/[0-9]+/):null))?u[0]:null, 	//upc code
						// 	          upc14: null, 	//availability of productnull, 	//upc14 code
						// 	           isbn: null, 	//isbn number
						// 	   	  userAgent: null,  //user agent of browser
						// 	   	  	   Host: result.window.location.href,
						// 		  	 ProdId: $("[itemtype$='Product'] [itemprop='productID']").attr("content"),  //Product ID that is grabbed from page 
						// 		  	 ProdMf: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),  //Product Manufacturer grabbed from page
						// 	       ProdName: $("[itemtype$='Product'] [itemprop='name']").text(), 	//name of product
						//            ProdDesc: null, //$("#product_short_description [itemprop='description']").text(), 	//description of product
						// 	      ProdModel: null, //$("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
						// 	      ProdImage: null, //$("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
						// 	   ProdCategory: $("[itemprop=breadcrumb]").text().replace(/\s/gi,' ').split(">").join("|"), 	//category of product as an Array
						// 	      ProdPrice: (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null, 	//price of product
						// 	  priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"), 	//unit of price, e.g. USD
						// 	    priceSymbol: (y=$("[itemtype$='Product'] [itemprop='price']").text().match(/(.)[\s]*([\d\.,]+)/))?y[1]:null,  //symbol of price, e.g. $
						// 	priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(), 	//date of current price 
						// 	   availability: (a=(((temp=$("[itemprop='availability']")).length)?temp.attr("href").match(/schema\.org\/(.+)/):null))?a[1]:null, 	//availability of product
						// 	  itemCondition: (i=(((temp=$("[itemprop='itemCondition']")).length)?temp.attr("href").match(/schema\.org\/(.+)/):null))?i[1]:null, 	//condition of product
						// };
						// ccs_pi = new PI(adapter); //create the PI object
						// ccs_pi.send(); //send the PI object to hive

					//var price = (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null;
					//console.log(price);
					//console.log(result.window.location.href);
					//console.log(adapter.Host,":\t", adapter.ProdName,"\t-\t",adapter.priceSymbol,adapter.ProdPrice);
				}
			}
		});

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

				console.log("# of sitemap sites: ", sites.length)
				console.log(sites);
				c.queue(sites[0]);
			})
		});
		console.log(rtimeout);
	}
});
