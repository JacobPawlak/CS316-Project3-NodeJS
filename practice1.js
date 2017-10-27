//Chelsea Kuball and Jacob Pawlak
//CS316 Program 3 - Xelkster
//October 26th, 2017


var http = require("http"),
	url = require('url');

const hostname = 'violet.cs.uky.edu';
var port = 2000;
//add STARTPORT and ENDPORT
const STARTPORT = 2000;
const ENDPORT = 30000;


//choose random number between STARTPORT and ENDPORT to be port number
if( (ENDPORT - STARTPORT) > 0){

	port = Math.floor(Math.random() * ENDPORT) + 1024;
}
else{
	port = STARTPORT;
}
//


//start the server up on the random port at our hostname
var server = http.createServer(function(request, response) {
	var xurl = request.url;
	response.statusCode = 200;
	response.setHeader('Content-Type', 'text/plain');
	response.end('You requested the following URL: '+xurl+'\n');

	//regex for songs, should match anything in the form of
	//	'/'FILENAME'.'mp3
	var songreg = /\/([\w]+)\.mp3$/
	//regex for images, should match anything in the form of
	//	'/'FILENAME'.'jpg
	var imgreg = /\/([\w]+)\.jpg$/

	console.log(xurl);

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
	else {
		console.log("bad url.");
	}


});

server.listen(port, hostname, function() {
	console.log('Server started. Listening on http://'+ hostname +':'+ port +'/');
	console.log('Waiting for a file request...');
});
