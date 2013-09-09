var http =  require("http"),
			url = require("url"),
			mu = require("mu2"),
			util = require('util');

function start(route){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;
		console.log("Request is here!");

		route(pathname);
		var stream = mu.compileAndRender('./index.html', {name: "zlodeev", age:"19"});

		util.pump(stream, response);
		
		response.writeHead(200, {"content-Type": "html"});
		// response.write("HEllo"+stream.toString());
		response.end();
	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started.");
}

exports.start = start;