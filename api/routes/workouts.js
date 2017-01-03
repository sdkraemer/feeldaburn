var Workout = require('../models/workout'),
    WorkoutTypeModels = require('../models/workouttype'),
    WorkoutType = WorkoutTypeModels.WorkoutType,
    StrengthTrainingWorkoutType = WorkoutTypeModels.StrengthTrainingWorkoutType,
    RunningWorkoutType = WorkoutTypeModels.RunningWorkoutType,
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;


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
        
        var json = req.body;
        console.dir(json);

        if(json.workoutType.type == "RUNNING"){
            console.log("Running workout");
            var workoutType = new RunningWorkoutType({
                workoutType: "RUNNING",
                //distance: json.workoutType.distance
                distance: 10
            });
        }
        else if(json.workoutType.type == "STRENGTH_TRAINING"){
            console.log("Strength Training workout");
            var workoutType = new StrengthTrainingWorkoutType({
                workoutType: "STRENGTH_TRAINING",
                guide: ObjectId(json.workoutType.guide)
            });
        }

        workoutType.save(function(err){
            if(err) { console.log('Error occurred saving a workout type.:' + err); }

            var workout = new Workout({
                name: json.name,
                notes: json.notes,
                createdBy: ObjectId(req.userId),
                completedAt: json.completedAt,
                workoutType: workoutType._id
            });

            
            workout.save(function(err, workout){
                if(err) { console.log('Error inserting new workout: '+err); }
                res.json(req.body);
            });
        });
 
    });

    app.put('/api/workouts/:id', function(req, res){
        Workout.findOne({'_id': req.params.id}, {}, function(err, workout){
            if (err) return console.error(err);

            workout.name = req.body.name || workout.name;
            workout.guide = workout.guide; //for now only allow assigning a guide on create
            workout.notes = req.body.notes || workout.notes;
            workout.createdBy = workout.createdBy;
            workout.completedAt = req.body.completedAt || workout.completedAt;
            
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

    function createRunningWorkout(workoutData){
        return new RunningWorkout({
            name: workoutData.name, 
            guide: ObjectId(workoutData.guide),
            notes: workoutData.notes,
            createdBy: ObjectId(req.userId),
            completedAt: workoutData.completedAt,
            type: workoutData.type,
            distance: workoutData.distance
        });
    }
}