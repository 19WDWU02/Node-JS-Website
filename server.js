const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer(function(req, res){
  console.log(`${req.method} request for ${req.url}`);
  if(req.url === '/'){
    fs.readFile('./public/index.html', 'UTF-8', function(err, data){
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    })
  } else if(req.url.match(/.css/)){
    const cssPath = path.join(__dirname, 'public', req.url);
    fs.readFile(cssPath, 'UTF-8', function(err, data){
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    })
  } else if(req.url === '/js/script.js'){
    fs.readFile('./public/js/script.js', 'UTF-8', function(err, data){
      if (err) throw err;
      res.writeHead(200, {'Content-Type': 'text/js'});
      res.end(data);
    })
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('404 file not found');
  }

}).listen(3000);

console.log('The server is running on port 3000');
