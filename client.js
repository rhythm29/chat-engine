/*
Sends a msg to another client B, via char server. Client also listens
on a port specified by commandline so that the server can push the
messages from other client
*/
var config = require('./config');

const express = require('express')
const clientApp = express()
const bodyParser = require('body-parser');
var request=require('request');
var cors = require('cors');
var http = require('http').Server(clientApp);
var io = require('socket.io')(http);
var path = require('path');


clientApp.set('view engine', 'ejs');
clientApp.use(express.static(__dirname + '/public'));
clientApp.use(bodyParser.json());
clientApp.use(cors()); 
var args = process.argv.slice(2);

var client = args[0];
var clientPort = parseInt(args[1]);

register(client,clientPort);

clientApp.post('/', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  // send message to web UI.
  io.emit('chat message',req.body.sender+":"+req.body.msg);
  res.send('{"msg":"ok"}')    
});

clientApp.get('/', function (req, res){
  res.render('chat', {name: client})    
});


http.listen(clientPort, function () {
  console.log('I am the Chat client running at ' + clientPort)
})

function register(name,port){
  var ret = {}
  ret['name'] = name;
  ret['port'] = port;
  console.log(JSON.stringify(ret))
	var options = {
    url: "http://"+config.SERVER_URL+":"+config.SERVER_PORT+"/register",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: ret
  };
  var request=require('request');
  	request(options, function(err, res, body) {
    	if (res.statusCode != 200 && res.statusCode != 201) {
      	console.log("Can't register with chat service. Try Again!!");
      	process.exit(-1)
      }
    });
}