var express = require('express'),
    bodyParser = require('body-parser');
    //seeder = require('./lib/dbSeeder'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var mongoose = require('mongoose');
mongoose.connect('mongodb://feeldburnmongodb/test');

var Workout = mongoose.model('Workout', { name: String });

// var hillSprints = new Workout({name: 'Hill Sprints'});
// hillSprints.save(function(err){
//     if (err) {
//     console.log(err);
//   } else {
//     console.log('savveeeddd');
//   }
// });





app.get('/', function(req, res){
    res.json({hello: "world"});
});

app.get('/api/workouts', function(req, res){
    Workout.find({},function(err, workouts){
        if (err) return console.error(err);
        res.json(workouts);
    });
});

app.get('/api/workouts/:id', function(req, res){
    console.log("/api/workouts/:id, "+req.params.id);
    Workout.find({ '_id': req.params.id }, {}, function (err, workout) {
        res.json(workout[0]);
    });

});

app.post('/api/workouts', function(req, res){
    console.log("Saving new workout.");
    var workout = new Workout({name: req.body.name});
    workout.save(function(err, workout){
        if(err) { console.log('Error inserting new workout: '+err); }
        res.json(req.body);
    });
});

app.put('/api/workouts/:id', function(req, res){
    console.log('Updating workout.');
    Workout.findOne({'_id': req.params.id}, {}, function(err, workout){
        if (err) return console.error(err);

        workout.name = req.body.name || workout.name;

        workout.save(function(err, workout){
            if(err) { 
                console.log("Error updating workout. "+err);
                res.json({ 'status': false });
            }
            res.json({ 'status': true });
        });
    });
});

var server = app.listen(3000, function(){
    console.log('Server running at http://127.0.0.1/');
});
