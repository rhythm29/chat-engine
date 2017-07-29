/*
Sends a msg to another client B, via char server. Client also listens
on a port specified by commandline so that the server can push the
messages from other client
*/
const express = require('express')
const clientApp = express()
const bodyParser = require('body-parser');
var request=require('request');
var cors = require('cors');


clientApp.set('view engine', 'ejs');

clientApp.use(bodyParser.json());
clientApp.use(cors()); 
var args = process.argv.slice(2);
console.log(args)
var client1 = args[0];
var clientPort = parseInt(args[1]);
var msg;
clientApp.post('/', function (req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  console.log(req.body.msg);
  msg = req.body.msg
  res.send('{"msg":"ok"}')    
});

clientApp.get('/', function (req, res){
  res.render('chat', {name: msg})    
});


clientApp.listen(clientPort, function () {
  console.log('I am the Chat client running at ' + clientPort)
})