var http = require('http');
var fs = require('fs');
var arr = ['samina','saima'];
var server = http.createServer(function(req,res){
    console.log('request was made'+req.url);
    if(req.url === '/home' || req.url === '/'){
        res.writeHead(200,{'Content-Type': 'text/html'});
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    }else if(req.url === '/musings'){
        res.writeHead(200,{'Content-Type': 'text/html'});
        //fs.createReadStream(__dirname + '/index.html').pipe(res);
        res.end('musings');
    }
    else if(req.url === '/town'){
        res.writeHead(200,{'Content-Type': 'text/html'});
        //fs.createReadStream(__dirname + '/index.html').pipe(res);
        res.end('town');
    }
    else if(req.url === '/links'){
        res.writeHead(200,{'Content-Type': 'text/html'});
        //fs.createReadStream(__dirname + '/index.html').pipe(res);
        res.end(JSON.stringify(arr));
    }
    else{
        res.writeHead(404,{'Content-Type' : 'text/html'});
        fs.createReadStream(__dirname + '/error.html').pipe(res);
    }

});

server.listen(3000,'127.0.0.1');
console.log('Now listening at port 30000');
