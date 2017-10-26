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

//1. call http.createServer(serveURL)
//2. implement serveURL()
/*3.The http object requires a call to the listen() method. Your
program shall call this with at least one option, a port number.
The port number shall be a random number between 
STARTPORT and ENDPORT inclusive. (STARTPORT and ENDPORT will be defined constants at the top of your program. You should use them as 2000 and 30000)
*/
//4. output to the console, the url uses including port: 
//"Server started. Listing on http://bel.cs.uky.edu:7876"


//serveURL() 
//1. output to the console the URL requested

/*2. use a regular expression to make sure the URL
requested only contains the upper and lower case
characters, the digits 0-9 and the _ (underscore), then
a . (period) and the extension "jpg" or "mp3".*/

//3. call 3 separate functions (giveAdvert(), giveJPG(), giveMP3())

var http = require("http"), 
	url = require("url");

const port = 5000;


var songreg = /\/([\w]+)\.mp3$/
var imgreg = /\/([\w]+)\.jpg$/


console.log(songreg.test("/eatmyshorts.mp3"));

//incorrect file names, extensions will be caught in this regex-test


//if( !(songreg.test(THEURLSTUFF)) || !(imgreg.test(THEURLSTUFF)) ){

//}
