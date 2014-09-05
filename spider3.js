//require('strong-agent').profile();



var Crawler = require("crawler").Crawler,
	util = require('util'),
	request = require('request'),
	memwatch = require("memwatch"),
	colors = require('colors'),
	icon = require('log-symbols'),
	PI = require("PI"),
	numSites = 0,
	i = 0;

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

var hd = new memwatch.HeapDiff();

memwatch.on('leak', function(info){
	console.log("Memory Leak".error);
	console.log(util.inspect(info, {colors:true}));
	console.log("Num Sites".error, numSites);
	// console.log(info);
	// var diff = hd.end();
	// console.log(util.inspect(diff, {colors: true, depth:10}));
	process.exit();
});

memwatch.on('stats', function(stats){
	console.log(util.inspect(stats, {colors: true, depth:10}));
	console.log("Memory Stats".info);
});
//console log start
console.log("\r\n\t",icon.success, ("Crawler " + process.argv[2] + " (" +process.pid +") started").success, "\r\n");
// process.send({
//          "cid": process.argv[2],
//          "pid": process.pid,
//          "message":"increment"
//       });
//start crawler

c = new Crawler({
		"maxConnections": 10,
		"debug": false,
		"cache": false,
		"skipDuplicates": false,
		"onDrain": function drain(){
			//exit process when crawler finishes queue
			//console.log("crawlers.length", crawlers.filter(function(v) { return v !== null }).length);
			// process.send({
			// 	"cid": process.argv[2],
			// 	"pid": process.pid,
			// 	"message":"empty"
			// });
			var stats = memwatch.gc();

		    //var diff = hd.end();
		    //console.log(util.inspect(diff, {colors: true, depth:10}));
			//console.log(stats);

   			//var diff = hd.end();
			//console.log(diff);
			process.exit();
		},
		"callback": function callback(error,result,$){
			 //use selectors to grab info off page the website in this loop
			
			if(!error)
			{
				if($)
				{
					var c,s,t,p,u,a,i,y,temp;
					ccs_cc_pi_args = {};
					if(s=(c=(temp=$("#cnet-content-solutions")) ? temp.prev():null) ? c.text().match(/\['(\w+)', '(\w+)']/g): null)
					{
						Array.prototype.forEach.call(s, function(el,i,array){ 
							t = el.match(/\['(\w+)', '(\w+)']/);
							ccs_cc_pi_args[t[1]] = t[2];
						});
					}
					var adapter= {
						           SKey: 'a62b622d', 	//subscriber key
						      ProductId: ccs_cc_pi_args['cpn'], //product number
						       SMfgName: ccs_cc_pi_args['mf'] || ((temp=$("[itemscope] [itemprop='manufacturer'] [itemprop='name']")).length) ? temp.attr("content"):null, //manufacturer name
						         SMfgPn: ccs_cc_pi_args['pn'] || ((temp=$("[itemtype$='Product'] [itemprop='model']")).length) ? temp.attr("content"):null,  //manufacturer part number
						      CatalogId: ccs_cc_pi_args['ccid'], //Catalog ID
						           LCID: ccs_cc_pi_args['lang'],  //Locale ID, language
						         Market: ccs_cc_pi_args['market'],  //market of product, 2 letter region code
						        SEanUpc: ccs_cc_pi_args['upcean'],  //UPC/EAN code
						          SkuId: null, 	//sku number CNET SKU ID (CDSID)
						            upc: (u=(((temp=$("[itemtype$='Product'] [itemprop='productID']")).length)?temp.attr("content").match(/[0-9]+/):null))?u[0]:null, 	//upc code
						          upc14: null, 	//availability of productnull, 	//upc14 code
						           isbn: null, 	//isbn number
						   	  userAgent: null,  //user agent of browser
						   	  	   Host: result.window.location.href,
							  	 ProdId: $("[itemtype$='Product'] [itemprop='productID']").attr("content"),  //Product ID that is grabbed from page 
							  	 ProdMf: $("[itemscope] [itemprop='manufacturer'] [itemprop='name']").attr("content"),  //Product Manufacturer grabbed from page
						       ProdName: $("[itemtype$='Product'] [itemprop='name']").text(), 	//name of product
						       ProdDesc: null, //$("#product_short_description [itemprop='description']").text(), 	//description of product
						      ProdModel: null, //$("[itemtype$='Product'] [itemprop='model']").attr("content"), 	//model number
						      ProdImage: null, //$("[itemtype$='Product'] [itemprop='image']").attr("content"), 	//product image
						   ProdCategory: $("[itemprop=breadcrumb]").text().replace(/\s/gi,' ').split(">").join("|"), 	//category of product as an Array
						      ProdPrice: (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null, 	//price of product
						  priceCurrency: $("[itemtype$='Product'] [itemprop='priceCurrency']").attr("content"), 	//unit of price, e.g. USD
						    priceSymbol: (y=$("[itemtype$='Product'] [itemprop='price']").text().match(/(.)[\s]*([\d\.,]+)/))?y[1]:null,  //symbol of price, e.g. $
						priceValidUntil: $("[itemtype$='Product'] [itemprop='priceValidUntil']").text(), 	//date of current price 
						   availability: (a=(((temp=$("[itemprop='availability']")).length)?temp.attr("href").match(/schema\.org\/(.+)/):null))?a[1]:null, 	//availability of product
						  itemCondition: (i=(((temp=$("[itemprop='itemCondition']")).length)?temp.attr("href").match(/schema\.org\/(.+)/):null))?i[1]:null, 	//condition of product
					};
					//ccs_pi = new PI(adapter, result.window.document); //create the PI object
					//ccs_pi.send();
					//var price = (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null;
					//console.log((adapter.Host + ":\t" + adapter.ProdName + "\t-\t").input + (adapter.priceSymbol + adapter.ProdPrice).help);
					//console.log(adapter.product);
					//console.log(result.window.location.href);
				}
		        //var price = (p=$("[itemtype$='Product'] [itemprop='price']").text().match(/([\d\.,]+)/)) ? p[1]:null;
		        //console.log("Price: $%d".warn,price);
		    }
		    else
		    {
		    	console.log("Error:".error, util.inspect(error, {colors:true, depth:10}));
		    }
			adapter = null;
			//ccs_pi.send(); //send the PI object to hive
			c = null,s = null,t = null,p = null,u = null,a = null,i = null,y = null,temp = null;
			ccs_cc_pi_args = null;
			//ccs_pi = null;
		    error = null;
		    $ = null;
		    result = null;

		    numSites++;
			if(numSites % 5 == 0)
			{
				console.log("Sites crawled:", numSites);
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
   // process.send({
   //       "cid": process.argv[2],
   //       "pid": process.pid,
   //       "message":"decrement"
   //    });
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

	var diff = hd.end();
	console.log(diff);
