const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var doesModifyBody = function(request, response, next) {
  response.setHeader("Content-Type", "text/html");
  response.end();
  next();
};

//app.use(doesModifyBody);

//habilitando HTML5MODE
app.all('/*', function(req, res) {
	//res.writeHead(200, {'Content-Type': 'text/html'});
    res.sendFile(path.resolve('public/index.html'));

    /*res.writeHead(200, {'Content-Type': 'text/html'});
        //res.write(data);
        res.end();*/
});

app.listen('8090', function () {
	console.log('Client em execução. Porta: 8090');
});