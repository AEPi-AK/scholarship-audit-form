var express = require('express');
var bodyParser = require('body-parser');
var cloudmine = require('cloudmine');
var config = require('./config.json');

var app = express();
var ws = new cloudmine.WebService({
  appid: config.appid,
  apikey: config.apikey
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3001);

app.post('/', function (req, res) {
  if (req.body.length === 0) {
    return;
  }

  var name = req.body['name'].replace(/\W+/g, "");
  delete req.body['name'];
  ws.set(name, req.body);
});
