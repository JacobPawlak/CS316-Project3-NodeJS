var http = require("http"),
	url = require('url');

const hostname = 'iris.cs.uky.edu';
const port = 3332;
//add STARTPORT and ENDPORT
const STARTPORT = 2000;
const ENDPORT = 30000;
//choose random number between STARTPORT and ENDPORT to be port number

var server = http.createServer(function(request, response) {
	var xurl = request.url;
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('You requested the following URL: '+xurl+'\n');
	var songreg = //[\w]+".mp3"/;
	var imgreg = //[\w]+".jpg"/;
	if(songreg.test(xurl)){
		console.log("requested song");
		//call file test function
		//call giveMP3()
	}
	else if(imgreg.test(xurl)){
		console.log("requested image");
		//call file test function
		//call giveJPG
	}
	else{
		console.log("bad url.");
		//throw some error message here
	}

});

server.listen(port, hostname, function() {
	console.log('Server started. Listening on http://'+ hostname +':'+ port +'/');
	console.log('Waiting for a file request...');
});
