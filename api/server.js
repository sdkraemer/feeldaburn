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


var mongoose = require('mongoose');
mongoose.connect(config.get("dbConnectionString"));
//mongoose.connect('mongodb://feeldaburn:qdra6A6CvtVdVsyta2FiHnHp3uMxK620d2gMzEzlYbaAYjqRti9aJtH8H9rQEyxkbIjuLeDt83H7HF2ZE8Zjog==@feeldaburn.documents.azure.com:10250/feeldaburn/?ssl=true');

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
