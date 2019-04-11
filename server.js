#!/usr/bin/env node
const url = require('url');
const http = require('http');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
let displayMessages = true;


if (argv.hasOwnProperty('h')) {
	console.log('logHttp - simple Echo Server for testing');
	console.log(' ');
	console.log(' -h : display this help');
	console.log(' -s : set status code for response');
	console.log(' -p : set listening port for server');
	console.log(' -e : set JSON file cotaining headers');
	console.log(' -b : set file to be sent as body');
	console.log(' -i : no informational messages');

	process.exit();
}
const statusCode = argv['s'] ? argv['s'] : 200;
const serverPort = argv['p'] ? argv['p'] : 3000;
const headerFile = argv['e'] ? argv['e'] : 'httpechostandardheader';
const bodyFile = argv['b'] ? argv['b'] : 'httpechostandardbody';

if(argv['i']) { displayMessages = false; }

checkFileOrExit(headerFile, 'Headerfile');
checkFileOrExit(bodyFile, 'Bodyfile');

if(displayMessages) {
	console.log("Using Status Code ", statusCode);
}

const app = http.createServer((req, res) => {
  query = url.parse(req.url, true).query;
	if(displayMessages) {
  	console.log("Incoming request");

		console.log(req.headers);
	}
	res.writeHead(statusCode, writeHeaderJSON()); 
  if ((statusCode >= 200) && (statusCode < 400)) {
		res.write(JSON.stringify(writeBodyJSON()));
	}
	res.end();
});


function writeHeaderJSON(res) {
	if(displayMessages) {
		console.log('Using ' + headerFile + ' as returned Headers');
	}
	let content = checkFileOrExit(headerFile, 'Headerfile');
 	jsonContent =  JSON.parse(content);
	return jsonContent; 
}

function writeBodyJSON(res) {
	if(displayMessages) {
		console.log('Using ' + bodyFile + ' as returned Body');
	}
	let content = checkFileOrExit(bodyFile, 'Bodyfile');
	return content; 
}

function checkFileOrExit(fileName, fileDescription) {
	if(fileName === 'httpechostandardheader') {
	let content = `	
		{
			"Content-Type": "text/json",
			"Access-Control-Allow-Origin": "*",
			"X-Powered-By": "nodeEchoService"
		}
		`;
		return content;
	}
	if(fileName === 'httpechostandardbody') {
	let content = `	
		{
  		"description": "returning Body",
  		"X-Powered-By": "nodeEchoService"
		}
		`;
		return content;
	}
	let checkResult = false;
	try {
		checkResult = fs.existsSync(fileName);
	} 
	catch(err) {
		console.log('Error searching for ' + fileDescription + ' ' + fileName);
		process.exit();
	}
	if (!checkResult) {
		console.log(fileDescription + ' ' + fileName + ' not found!');
		process.exit();
	}
	try {
		let content = fs.readFileSync(fileName);
		return content;
	} 
	catch(err) {
		console.log('Error reading file ' + fileName + ' - Exiting.');
		process.exit();
	}
}

console.log("Starting Server on Port " + serverPort);
app.listen(serverPort);
