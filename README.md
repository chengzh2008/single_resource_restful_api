# My Blogs: Angular web application with single Resource RESTful API web server

At moment, user can add whatever blogs as they want, no restriction temporally. Later authentication will be added.


## Technologies used in this Web application:
	Angular, NodeJs, Express, MongoDB, Mongoose, Grunt, Chai, Chai-http, and some third-party libraries

	Front-end: AngularJs
	Back-end: NodeJs/ExpressJs
	Front-end testing: Angular-mocks, Karma, Jasmin
	Back-end testing: Mocha, Chai(http)
	Other tools used: Grunt, Browserify, Bower, npm, debowerify, jshint
	IDE: WebStorm
	Cloud hosting: Heroku
	Database: NoSQL MongoDB

## Usage

	grunt build 	// to generate build files for serving the web application
	grunt test:client 	// run the test code for angular front-end
	grunt test:server	// run the test code for restful api back-end, remember to run 'mongod' before running the test code

Web application address:

	myangulablog.herokuapp.com

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

Back-end:
There are four modules in my express framework:
	
	index.js			// The package main js file
	server.js 			// Server related configuration and creation
	blogs.js			// Model definition and configuration of MongoDB with mongoose
	blogs_routes.js		// Routes handling method (RESTFul API web service, supporting GET|POST|PUT|DELETE request)

Front-end:

	Front-end code is located in app directory. app/js directory holds all JavaScript codes.
	"build/" directory holds the code delivery the code to user
	"db/" directory holds the mongoDB data. In Heroku cloud, mongolab serve as the database.
	"test/" directory holds the testing code, including front-end and back-end.

## Credits
Give credits to instructors and members in CodeFellow Fullstack Javascript for those helpful discussion and suggestion.



