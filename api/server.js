var express = require('express'),
    config = require('config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Workout = require('./models/workout'),
    ObjectId = mongoose.Types.ObjectId,
    userId = require('./userId');
    jwt = require('express-jwt'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var authCheck = jwt({
  secret: new Buffer('48kVnyEKzqRQRiZNQ2i48cjMlkkhfK77isP6firPm4ta9M19Jn0zX2Hjl0wDU4Hc', 'base64'),
  audience: 'TSWTGq6o5dDKUYt1qxvSGWOjikQZ38VX'
});


var mongooseConfig = config.get("mongo");
console.dir(mongooseConfig);
//var connectionString = "mongodb://"+mongooseConfig.username+":"+mongooseConfig.password+"@"+mongooseConfig.host+":27017/db?authSource=admin";
var connectionString = "mongodb://"+mongooseConfig.host+":27017/db";
console.log(connectionString);
mongoose.connect(connectionString);

app.use('/api/workouts', [authCheck, userId]);
app.use('/api/guides', [authCheck, userId]);
app.use('/api/users', [authCheck]);

var workouts = require('./routes/workouts.js')(app);
var guides = require('./routes/guides.js')(app);
var users = require('./routes/users.js')(app);

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({error: "Hmmm something happened"});
});


var port = process.env.port || '3000';
var server = app.listen(port, function(){
    console.log('Server listening on port:'+port);
});

process.on('SIGINT', function() {
    console.log('SIGINT: Closing MongoDB connection');
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
