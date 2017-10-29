//Chelsea Kuball and Jacob Pawlak

/*
Your program will return one of the four following things:


1) the mp3 file they asked for (a song)
2) the jpg file they asked for (album art)
3) an HTML file denoting an error.
4) "advert.jpg" - see below:

5) 33% of the time, your program will return file file "advert.jpg",
instead of the requested mp3/jpg file they requested.
*/
//Chelsea Kuball and Jacob Pawlak
//CS316 Program 3 - Xelkster
//October 26th, 2017


var http = require("http"),
	fs = require("fs"),
	url = require('url');

//const hostname = 'localhost';
const hostname = 'iris.cs.uky.edu';
var port = 3344;
//const hostname = 'violet.cs.uky.edu';
//var port = 2000;

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
	var xurl = url.parse(request.url,true);
	var filename = "." + xurl.pathname;
	var advert = "./somepicture.jpg";
	var rand_num = Math.random();
	console.log('You requested the following URL: '+request.url);
	//console.log(rand_num);
	response.statusCode = 200;
	//response.setHeader('Content-Type', 'text/plain');
	//regex for songs, should match anything in the form of
	//	'/'FILENAME'.'mp3
	var songreg = /\/([\w]+)\.mp3$/
	//regex for images, should match anything in the form of
	//	'/'FILENAME'.'jpg
	var imgreg = /\/([\w]+)\.jpg$/
	if(rand_num< (1/3)){
		console.log("sending advert.jpg");
		giveAdvert(advert,response);
	}
	else{
		if(songreg.test(filename)){
			console.log("requested song");
			//call file test function
			//call giveMP3()
			giveMP3(filename,response);
		}
		else if(imgreg.test(filename)){
			console.log("requested image:");
			console.log(filename);
			//call file test function
			//call giveJPG
			giveJPG(filename,response);
		}
		else{
			console.log("bad url.");
			//throw some error message here
		}
	}

});

server.listen(port, hostname, function() {
	console.log('Server started. Listening on http://'+ hostname +':'+ port +'/');
	console.log('Waiting for a file request...');
});

function giveJPG(requested_file,response){
	fs.readFile(requested_file, function(err,data){
		if (err) {
			response.writeHead(404, {'Content-Type': 'text/html'});
			return response.end("404 Not Found");
		}
		response.writeHead(200, {'Content-Type': 'image/jpeg'});
		response.write(data);
		return response.end();
	});
}
function giveMP3(requested_file, response){
	fs.readFile(requested_file, function(err,data){
		if(err){
			response.writeHead(404, {'Content-Type': 'text/html'});
			return response.end("404 Not Found");
		}
		response.writeHead(200, {'Content-Type' : 'audio/mpeg3'});
		response.write(data);
		return response.end();
	});
}
function giveAdvert(advert, response){
		fs.readFile(advert, function(err,data){
		if(err){
			response.writeHead(404, {'Content-Type' : 'text/html'});
			return response.end("404 Not Found");
		}
		response.writeHead(200, {'Content-Type' : 'image/jpeg'});
		response.write(data);
		return response.end();
	});
}
