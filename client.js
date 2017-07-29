/*
Sends a msg to another client B, via char server.
*/
var request=require('request');

var msg = {
  "sender": "A",
  "receiver": "B",
  "type": "push",
  "msg": "Ich Leibe Berlin"
};

var options = {
  url: 'http://localhost:3000',
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
