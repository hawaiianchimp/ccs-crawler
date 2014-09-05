var util = require("util"),
	memwatch = require("memwatch");

heap = []
var hd = new memwatch.HeapDiff();
for(i=0;i<1000;i++){
	heap[i] = i*100;
	//console.log(i, util.inspect(process.memoryUsage()));
}
//console.log("new", util.inspect(process.memoryUsage()));
for(i=0;i<1000;i++){
	heap[i] = i*100;
	//console.log(i, util.inspect(process.memoryUsage()));
	for(j=0;j<10;j++){
		heap[i] = [];
		heap[i][j] = i*100;
		//console.log(i, j, util.inspect(process.memoryUsage()));
	}
}

var diff = hd.end();
console.log(util.inspect(diff, {colors: true, depth: 10}));
//console.log("before",util.inspect(process.memoryUsage()));
heap1 = heap;
//console.log("after", util.inspect(process.memoryUsage()));


for(i=0;i<1000;i++){
	for(j=0;j<10;j++){
		heap[i][j] = null;
		//console.log(i, j, util.inspect(process.memoryUsage()));
	}
}
for(i=0;i<1000;i++){
	heap[i] = null;
	//console.log(i, util.inspect(process.memoryUsage()));
}

//console.log("end", util.inspect(process.memoryUsage()));
heap = null;
heap1 = null;
//console.log("finish", util.inspect(process.memoryUsage()));


memwatch.on("leak", function(stats){
	console.log(stats);
})