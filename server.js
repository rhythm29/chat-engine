/*
Receives a message from client and then forward it to receiver
mentioned in the message 
*/
var config = require('./config');

var clients = {}; //Contains name to port mapping of each client
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
var cors = require('cors');

app.use(cors()); 
app.use(bodyParser.json());

app.post('/', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
  	relayChat(req.body)	
  	res.send('{"msg":"ok"}')
  
});

// Save client name to port mapping.
app.post('/register', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
  clients[req.body.name] = req.body.port
  console.log(clients)
  res.send('{"msg":"ok"}')
  
});

app.listen(config.SERVER_PORT, function () {
  console.log('I am the server at:'+config.SERVER_PORT)
});

// relay the message received by a client to other client.
function relayChat(body){
	sender = body['sender'];
	receiver = body['receiver'];
	var options = {
    url: "http://localhost:"+clients[receiver],
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: body
  };
  var request=require('request');
  	request(options, function(err, res, body) {
    	if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      	console.log("message sent to"+ receiver);
      }
    });
}