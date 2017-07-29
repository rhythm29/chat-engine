/*
Receives a message from client
*/

const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.post('/', function (req, res) {
	console.log(req.body)
});

app.listen(3000, function () {
  console.log('I am the server 3000!')
});
