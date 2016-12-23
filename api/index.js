var express = require('express'),
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


var mongoose = require('mongoose');
mongoose.connect('mongodb://feeldburnmongodb/test');

app.use('/api/workouts', [authCheck, userId]);
app.use('/api/guides', [authCheck, userId]);
app.use('/api/users', [authCheck]);

var workouts = require('./routes/workouts.js')(app);
var guides = require('./routes/guides.js')(app);
var users = require('./routes/users.js')(app);

app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({error: "Hmmm something happened"});
});



var server = app.listen(3000, function(){
    console.log('Server running at http://127.0.0.1/');
});
