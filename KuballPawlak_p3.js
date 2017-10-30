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
//const hostname = 'iris.cs.uky.edu';
const hostname = 'violet.cs.uky.edu';
var port = 3344;

//add STARTPORT and ENDPORT
const STARTPORT = 2000;
const ENDPORT = 30000;


//choose random number between STARTPORT and ENDPORT to be port number
if( (ENDPORT - STARTPORT) > 0){

	//set the port number to a random number starting at 1024
	port = Math.floor(Math.random() * ENDPORT) + 1024;
}
else{
	//if the numbers are the same, or the starting number is larger
	// than the endnumber set the port to the startpoint
	port = STARTPORT;
}


//start the server up on the random port at our hostname
var server = http.createServer(function(request, response) {

	//get the URL from the browser
	var xurl = url.parse(request.url,true);
	var filename = "." + xurl.pathname;
	//get the advertizement ready
	var advert = "./somepicture.jpg";
	var rand_num = Math.random();
	//report the url to the console
	console.log('You requested the following URL: '+request.url);

	response.statusCode = 200;

	//regex for songs, should match anything in the form of
	//	'/'FILENAME'.'mp3
	var songreg = /\/([\w]+)\.mp3$/
	//regex for images, should match anything in the form of
	//	'/'FILENAME'.'jpg
	var imgreg = /\/([\w]+)\.jpg$/

	//the advert needs to be called about 33% of the time, so the random
	// number must be under 1/3
	if(rand_num< (1/3)){
		console.log("sending advert.jpg");
		giveAdvert(advert,response);
	}
	//if we arent showing the advert, try and show the picture or download
	// the song for the requested url
	else{
		//if the url passes the regex test for mp3 files, serve up the
		// requested file
		if(songreg.test(filename)){
			console.log("requested song");
			//call file test function
			//call giveMP3()
			giveMP3(filename,response);
		}
		//if the url fails the song regex but passes the image regex,
		// serve up the requested image
		else if(imgreg.test(filename)){
			console.log("requested image:");
			console.log(filename);
			//call file test function
			//call giveJPG
			giveJPG(filename,response);
		}
		//if the url fails the song and image regexes, then the url is bad,
		else{
			//throw an error message for the url
			console.log("bad url. please use the format <name>.jpg or <name>.mp3");
			response.writeHead(404, {'Content-Type': 'text/html'});
                        return response.end("<strong><h1>Bad URL. Please use the format /'name'.jpg or /'name'.mp3</h1></strong>");
		}
	}

});

//tell the server to listen for web requests from the server
server.listen(port, hostname, function() {
	//report the hostname and port number to the console (because it is a random
	// number, you kinda need to see it each time)
	console.log('Server started. Listening on http:'+ hostname +':'+ port +'/');
	console.log('Waiting for a file request...');
});

//serving up the image file
function giveJPG(requested_file,response){
	//try to search the directory for the requested image
	fs.readFile(requested_file, function(err,data){
		//if you dont find it, throw an error
		if (err) {
			response.writeHead(404, {'Content-Type': 'text/html'});
			return response.end("<strong><h1>403, the file you were looking for was not found</h1></strong>");
		}
		//if you find it, put it on the screen
		response.writeHead(200, {'Content-Type': 'image/jpeg'});
		response.write(data);
		return response.end();
	});
}

//serving up the music file
function giveMP3(requested_file, response){
	//try to search the directory for the requested image
	fs.readFile(requested_file, function(err,data){
		//if you dont find it, throw an error
		if(err){
			response.writeHead(404, {'Content-Type': 'text/html'});
			return response.end("<strong><h1>403, the file you were looking for was not found</h1></strong>");
		}
		//if you find it, let the user download it
		response.writeHead(200, {'Content-Type' : 'audio/mpeg3'});
		response.write(data);
		return response.end();
	});
}

//serving up the advert file
function giveAdvert(advert, response){
	//look for the advert file
	fs.readFile(advert, function(err,data){
		//if the advert file doesnt exist, throw an error
		if(err){
			response.writeHead(404, {'Content-Type' : 'text/html'});
			return response.end("<strong><h1>403, the file you were looking for was not found</h1></strong>");
		}
		//if its there, show it to the user
		response.writeHead(200, {'Content-Type' : 'image/jpeg'});
		response.write(data);
		return response.end();
	});
}
