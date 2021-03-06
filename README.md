# Single Resource RESTful API

## Technologies used in this RESTful API:
	NodeJs, Express, MongoDB, Mongoose, Grunt, Chai, Chai-http, and some third-party libraries

This is the RESTFUL API server backed by MongoDB.

## Usage

**Installation**:
`npm install single_resource_restful_api`

**Then in your code**: Just require the server installed. Then your server is up and running.

	require('./single_resource_restful_api')
	

## Test the server
You can use superagent-cli or any other http request utility to test the server.

`superagent <url> <rest method(get|post|put|patch|delete)> <json data>`

## Http request/response format 

It supports http request `<get|post|put|delete>`.

For put, post, the Json data is sent along with the request, saved or modified json data sent back.

	//json data in the request:
	{ 	key1: value1,
		key2: value2,
		key3: value3
	}

							
For get request, an array of json objects will be sent back

	//response data in the res.body:
    	[{ 	key1: value1,
    		key2: value2,
    		key3: value3
    	},
    	...
    	]

For delete request, no data is sent along the request, the response data is a json object showing a message like this:

	// json data in the response:
	{msg: 'Your doc has been removed: ID ' + req.params.id}


## Internal components (for reference only)

There are four modules in my express framework: 
	
	index.js			// The package main js file
	server.js 			// Server related configuration and creation
	blogs.js			// Model definition and configuration of MongoDB with mongoose
	blogs_routes.js		// Routes handling method (RESTFul API web service, supporting GET|POST|PUT|DELETE request)


## Credits
Give credits to instructors and members in CodeFellow Fullstack Javascript for those helpful discussion and suggestion.



