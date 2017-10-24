var http = require("http"),
	url = require('url');

const hostname = 'iris.cs.uky.edu';
const port = 3332;

var server = http.createServer(function(request, response) {
	var xurl = request.url;
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('Hello, World!  You requested the following URL: '+xurl+'\n');
	var songreg = //[\w]+".mp3"/;
	var imgreg = //[\w]+".jpg"/;
	if(!(songreg.test(xurl)) || !(imgreg.test(xurl))){
		console.log("bad url.");
	}
	else{
		console.log("good url");
	}
});

server.listen(port, hostname, function() {
	console.log('Server running at http://'+ hostname +':'+ port +'/');
	console.log('Hello, World!');
});
