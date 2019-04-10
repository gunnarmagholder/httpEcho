const url = require('url');
const http = require('http');
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

if (argv.hasOwnProperty('h')) {
	console.log('logHttp - simple Echo Server for testing');
	console.log(' ');
	console.log(' -h : display this help');
	process.exit();
}

const statusCode = argv['s'] ? argv['s'] : 200;

console.log("Using Status Code ", statusCode);

const app = http.createServer((req, res) => {
  query = url.parse(req.url, true).query;
  console.log("Incoming request");

	console.log(req.headers);
  res.writeHead(statusCode, writeHeaderJSON()); 
  if ((statusCode >= 200) && (statusCode < 400)) {
		res.write(JSON.stringify(writeBodyJSON()));
	}
	res.end();
});


function writeHeaderJSON(res) {
	let content = fs.readFileSync("headerStandard.json");
  jsonContent =  JSON.parse(content);
	return jsonContent;
}

function writeBodyJSON(res) {
    let content = fs.readFileSync("bodyStandard.json");
    return JSON.stringify(JSON.parse(content));
}


console.log("Starting Server on Port 3000");
app.listen(3000);
