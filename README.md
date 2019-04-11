# httpEcho
Simple http echo server 

This server starts an http listener and gives back some results.

# JSON Files
The package seeks two files in the root of the project:
bodyStandard.json - what to send as the body
headerStandard.json - what to send as the header

# Parameters
-s defines the statuscode to be send  
-h show a help page and exit   
-p set the listening port for the server  
-e use a different headerfile instead of headerStandard.json  
-b use a different bodyfile instead of bodyStandard.json  
  
if you use yarn you can use the following scripts: 
  
yarn runok - runs with statuscode 200   
yarn runfail - runs with statuscode 404  
yarn runserverfail - runs with statuscode 500   

# Use it 
This tool can be installed as an NPM package. Just use   
npm install echohttp -g  
to install it globally. After that, there is the command  
echohttp  
available.  

# Examples  
  
echohttp -h   
Display the help.  
  
echohttp -s 404 -p 8080  
Open the http server on port 8080 and always return the statuscode 404.   
  
echohttp -p 8080 -e header.json  
Open the server on port 8080 and return the content of header.json as headers.  
### header.js   
  
		{  
			"Content-Type": "text/json",  
			"Access-Control-Allow-Origin": "*",  
			"X-Powered-By": "nodeEchoService"  
		}  
		  
These are the fallback settings. The keys in that kson correspond to the header attribute, the values are the used values for every attribute.  


