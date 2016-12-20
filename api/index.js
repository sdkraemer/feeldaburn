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

////////////////////////////////////////////////////
// Workouts
app.get('/', function(req, res){
    res.json({hello: "world"});
});

app.get('/api/workouts', [authCheck, userId] , function(req, res){
    Workout.find({'createdBy': ObjectId(req.userId)},function(err, workouts){
        if (err) return console.error(err);
        res.json(workouts);
    });
});

app.get('/api/workouts/:id', [authCheck, userId], function(req, res){
    Workout.findOne({ '_id': req.params.id, 'createdBy': ObjectId(req.userId) }, {}, function (err, workout) {
        res.json(workout);
    });

});

app.post('/api/workouts', [authCheck, userId], function(req, res){
    var workout = new Workout({
                        name: req.body.name, 
                        notes: req.body.notes,
                        createdBy: ObjectId(req.userId)
                    });
    workout.save(function(err, workout){
        if(err) { console.log('Error inserting new workout: '+err); }
        res.json(req.body);
    });
});

app.put('/api/workouts/:id', [authCheck, userId], function(req, res){
    Workout.findOne({'_id': req.params.id}, {}, function(err, workout){
        if (err) return console.error(err);

        workout.name = req.body.name || workout.name;
        workout.notes = req.body.notes || workout.notes;
        workout.createdBy = workout.createdBy;

        workout.save(function(err, workout){
            if(err) { 
                console.log("Error updating workout. "+err);
                res.json({ 'status': false });
            }
            res.json({ 'status': true });
        });
    });
});

app.delete('/api/workouts/:id', [authCheck, userId], function(req, res){
    console.log('DELETE /api/workout/%s', req.params.id);
    Workout.remove({_id: req.params.id}, function(err){
        if(err){
            console.log("Error occurred removing workout: %s", err);
        }
        res.sendStatus(200);
    });
});

////////////////////////////////////////////////////
// Users

app.post('/api/users', [authCheck], function(req, res){
    var auth0UserId = req.body.user_id;
    var user = User.findOne({'auth0UserId': auth0UserId}, {}, function(err, user){
        if(err) {console.log("Error occurred trying to find user by logged in auth0 user.")}
        console.log("POST /api/users ... Does user exist? %j", user);
        if(!user){
            var user = new User({name: req.body.name, auth0UserId: auth0UserId});
            user.save(function(err, user){
                if(err) {
                    console.log('user not created: '+err);
                    res.json(user);
                }
                res.json(user);
            });

        }
    });
});


app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({error: "Hmmm something happened"});
});



var server = app.listen(3000, function(){
    console.log('Server running at http://127.0.0.1/');
});
