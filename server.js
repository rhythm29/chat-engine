/*
Receives a message from client and then forward it to receiver
mentioned in the message 
*/
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
  	sendChatFurther(req.body)	
  	res.send('{"msg":"ok"}')
  
});

app.post('/register', function (req, res) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body)
  clients[req.body.name] = req.body.port
  console.log(clients)
  res.send('{"msg":"ok"}')
  
});

app.listen(3000, function () {
  console.log('I am the server 3000!')
});

function sendChatFurther(body){
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