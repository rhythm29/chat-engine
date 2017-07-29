/*
Receives a message from client and then forward it to receiver
mentioned in the message 
*/

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/', function (req, res) {
	console.log("hello")
  	sendChatFurther(req.body)	
  	res.send('{"msg":"ok"}')
  
});

app.listen(4000, function () {
  console.log('I am the server 4000!')
});

function sendChatFurther(body){
	sender = body['sender'];
	receiver = body['receiver'];
	switch (receiver){
		case "A":
		 var port = 8000
		 break;
		case "B":
		 port = 9000
		 break;
	}
	var options = {
    url: "http://localhost:"+port,
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