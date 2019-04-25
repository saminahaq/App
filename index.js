//template
//express

var express = require('express');
var app = express();
var fs = require('fs');
http = require('http');
app.use(auth);

const port = 3000;
const hostname = 'localhost';
//middleware for the other
app.use('/assets',express.static('assets'));
//var urlencodeParser = bodyParser.urlencodeParser({extended: false});
//setup for the ejs files like html
app.set('view engine','ejs');

app.get('/', function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
});

app.get('/home', function(req,res){
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.createReadStream(__dirname + '/index.html').pipe(res);
});
app.get('/stocks', function(req,res){
    var data ={stocks :['Mango','Orange']}
    res.render('stocks', {qs: req.query, data:data});
});
// app.get('/links', function(req,res){
//  res.render('links');
// });
app.get('/contacts', function(req,res){
   
    res.render('contacts');
});
// app.post('/contacts', urlencodeParser ,function(req,res){
//     console.log(req.body);
//    res.render('contacts');
// });

app.get('/links', function(req,res){
    var data ={name :'samina' ,age:29, job : 'Software Developer', stocks :['Tesla','Apple']}
    res.render('links', {name : req.params.name, data:data});
});

function auth (req, res, next) {
    console.log(req.headers);
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }
  
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');      
        err.status = 401;
        next(err);
    }
  }
  

//   function auth (req, res, next) {
//   if (!req.signedCookies.user) {
//     var authHeader = req.headers.authorization;
//     if (!authHeader) {
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');              
//         err.status = 401;
//         next(err);
//         return;
//     }
//     var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//     var user = auth[0];
//     var pass = auth[1];
//     if (user == 'admin' && pass == 'password') {
//         res.cookie('user','admin',{signed: true});
//         next(); // authorized
//     } else {
//         var err = new Error('You are not authenticated!');
//         res.setHeader('WWW-Authenticate', 'Basic');              
//         err.status = 401;
//         next(err);
//     }
//   }
//   else {
//       if (req.signedCookies.user === 'admin') {
//           next();
//       }
//       else {
//           var err = new Error('You are not authenticated!');
//           err.status = 401;
//           next(err);
//       }
//   }
// }


const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});