/*
Sends a msg to another client B, via char server. Client also listens
on a port specified by commandline so that the server can push the
messages from other client
*/
const express = require('express')
const clientApp = express()
const bodyParser = require('body-parser');
var request=require('request');


clientApp.use(bodyParser.json());
var args = process.argv.slice(2);
console.log(args)
var client1 = args[0];
var client2 = args[1]
var clientPort = parseInt(args[2]);

clientApp.post('/', function (req, res){
  console.log(req.body.msg);
  res.send('{"msg":"ok"}')    
});


clientApp.listen(clientPort, function () {
  console.log('I am the Chat client running at ' + clientPort)
})

//Client is sending request here

var msg = {
  "sender": client1,
  "receiver": client2,
  "type": "push",
  "msg": "Ich Leibe Berlin"
};

var options = {
  url: 'http://localhost:4000',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  json: msg
};

request(options, function(err, res, body) {
  if (res && (res.statusCode === 200 || res.statusCode === 201)) {
    console.log(body);
  }
});