//express

var express = require('express');
var app = express();
var fs = require('fs');
http = require('http');
const port = 3000;
const hostname = 'localhost';

app.get('/', function(req,res,next){
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
});

app.get('/home', function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
});
app.get('/musings', function(req,res){
    res.statusCode = 403;
    res.send('This is musings page');
});
app.get('/links', function(req,res){
    res.send('This is linkes page');
});
app.get('/Portfolio/:id', function(req,res){
    res.send('This is linkes page id '+ req.params.id);
});
app.get('/links/:name', function(req,res){
    res.send('This is links page name '+ req.params.name);
});
const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });