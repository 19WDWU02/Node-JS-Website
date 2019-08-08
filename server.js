const http = require('http');
const fs = require('fs');
const path = require('path');
var qs = require('querystring');

http.createServer(function(req, res){
    console.log(`${req.method} request for ${req.url}`);


    if(req.method === 'GET'){
        //All of the GET Requests will go here
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
        // All of the post requests will go here
        // on our index.html file we have a form with a post route which goes to /sendForm
        if(req.url === '/sendForm'){
            // Eventually we will be dealing with large amounts of data
            // Our servers won't be able to handle all the data at onces
            // The .on('data') function will trigger as many times as it needs to process all the data
            // The variable of body will hold all the 'chunks' of data and once it is completed the .on('end') function will trigger
            let body = '';
            req.on('data', function(data){
                body += data;
            })
            req.on('end', function(){
                console.log('at the end');
                console.log(body.toString());
                // the querystring module (qs) converts the body variable into a js object which we can them use our normal JS on
                const formData = qs.parse(body.toString());
                console.log(formData);
            })
        }
    }
}).listen(3000);

console.log('The server is running on port 3000');
