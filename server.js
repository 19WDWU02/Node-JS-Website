const http = require('http');
const fs = require('fs');
const path = require('path');
var qs = require('querystring');

http.createServer(function(req, res){
  console.log(`${req.method} request for ${req.url}`);

  if(req.method === 'GET'){
    if(req.url === '/'){
      fs.readFile('./public/index.html', 'UTF-8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      })
    } else if(req.url.match(/node_modules/)){
      const modulePath = path.join(__dirname, req.url);
      fs.readFile(modulePath, 'UTF-8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      })
    } else if(req.url.match(/.css/)){
      const cssPath = path.join(__dirname, 'public', req.url);
      fs.readFile(cssPath, 'UTF-8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.end(data);
      })
    } else if(req.url.match(/.js/)){
      const jsPath = path.join(__dirname, 'public', req.url);
      fs.readFile(jsPath, 'UTF-8', function(err, data){
        if (err) throw err;
        res.writeHead(200, {'Content-Type': 'text/js'});
        res.end(data);
      })
    } else if(req.url.match(/.jpeg/)){
      const imgPath = path.join(__dirname, 'public', req.url);
      fs.readFile(imgPath, function(err, data){
        if(err) throw err;
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data);
      })
    } else {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('404 file not found');
    }
  } else if(req.method === 'POST'){
    if(req.url === '/sendForm'){
      let body = '';
      req.on('data', function(data){
        body += data;
      })
      req.on('end', function(){
        console.log('at the end');
        console.log(body.toString());
        const formData = qs.parse(body.toString());
        console.log(formData);
      })

    }
  }





}).listen(3000);

console.log('The server is running on port 3000');
