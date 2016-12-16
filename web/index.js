var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var port = 4200;

var app = express();

app.use('/', express.static(__dirname + '/client/dist'));

//View Engine
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//app.use('/', 'index.html');
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/client/dist/index.html'));
});

app.listen(port, function(){
    console.log('Server started on port '+port);
});