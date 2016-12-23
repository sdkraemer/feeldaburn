var Workout = require('../models/workout');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;


module.exports = function(app) {

    app.get('/api/workouts', function(req, res){
        Workout.find({'createdBy': ObjectId(req.userId)},function(err, workouts){
            if (err) return console.error(err);
            res.json(workouts);
        });
    });

    app.get('/api/workouts/:id', function(req, res){
        Workout.findOne({ '_id': req.params.id, 'createdBy': ObjectId(req.userId) }, {}, function (err, workout) {
            res.json(workout);
        });

    });

    app.post('/api/workouts', function(req, res){
        var workout = new Workout({
                            name: req.body.name, 
                            guide: ObjectId(req.body.guide),
                            notes: req.body.notes,
                            createdBy: ObjectId(req.userId),
                            completedAt: req.body.completedAt
                        });
        workout.save(function(err, workout){
            if(err) { console.log('Error inserting new workout: '+err); }
            res.json(req.body);
        });
    });

    app.put('/api/workouts/:id', function(req, res){
        Workout.findOne({'_id': req.params.id}, {}, function(err, workout){
            if (err) return console.error(err);

            console.dir(req.body);
            workout.name = req.body.name || workout.name;
            workout.guide = workout.guide; //for now only allow assigning a guide on create
            workout.notes = req.body.notes || workout.notes;
            workout.createdBy = workout.createdBy;
            workout.completedAt = req.body.completedAt || workout.completedAt;
            console.dir(workout);
            workout.save(function(err, workout){
                if(err) { 
                    console.log("Error updating workout. "+err);
                    res.json({ 'status': false });
                }
                res.json({ 'status': true });
            });
        });
    });

    app.delete('/api/workouts/:id', function(req, res){
        console.log('DELETE /api/workout/%s', req.params.id);
        Workout.remove({_id: req.params.id}, function(err){
            if(err){
                console.log("Error occurred removing workout: %s", err);
                res.sendStatus(404);
            }
            res.sendStatus(200);
        });
    });
}