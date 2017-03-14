var WorkoutModels = require('../models/workout'),
    Workout = WorkoutModels.Workout,
    StrengthTrainingWorkout = WorkoutModels.StrengthTrainingWorkout,
    Guide = require('../models/guide'),
    RunningWorkout = WorkoutModels.RunningWorkout,
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;


module.exports = function(app) {

    app.get('/api/workouts', function(req, res){
        console.log("req.userId: %s", req.userId);
        var conditions = {
            'createdBy': ObjectId(req.userId)
        };
        //Simple date searching to start
        if(req.params.start && req.params.end){
            conditions['completedAt'] = {$gte: new Date(req.params.start), $lte: new Date(req.params.end)}
        }

        Workout.
            find(conditions)
            .limit(10)//limit to past 10 for now.
            .sort({completedAt: 'desc'})
            .exec(function(err, workouts){
                if(err){
                    console.log("Could not find workouts: %s", err);
                    res.sendStatus(404);
                }
                res.json(workouts);
            });
    });

    app.get('/api/workouts/:id', function(req, res){
        Workout
            .findOne({ '_id': req.params.id, 'createdBy': ObjectId(req.userId) })
            .exec(function (err, workout) {
                res.json(workout);
            });
    });

    app.post('/api/workouts', function(req, res){
        var json = req.body;

        if(json.type == "RUNNING"){
            console.log("Running workout");
            var workout = new RunningWorkout({
                type: "RUNNING",
                name: "Running Workout",
                notes: json.notes,
                createdBy: ObjectId(req.userId),
                isCompleted: json.isCompleted,
                completedAt: json.completedAt,
                distance: json.distance
            });
        }
        else if(json.type == "STRENGTH_TRAINING"){
            console.log("Strength Training workout");
            Guide.findOne({_id: ObjectId(json.guide)}, function(err, guide){
                var workout = new StrengthTrainingWorkout({
                    type: "STRENGTH_TRAINING",
                    name: guide.name,
                    notes: json.notes,
                    createdBy: ObjectId(req.userId),
                    isCompleted: json.isCompleted,
                    guide: ObjectId(json.guide),
                    exercises: json.exercises
                });

                if(json.isCompleted){
                    workout.completedAt = new Date();
                }

                workout.save(function(err, workout){
                    if(err) { console.log('Error inserting new workout: '+err); }
                    res.json(req.body);
                });
            });

        }
    });

    app.put('/api/workouts/:id', function(req, res){
        Workout.findOne({'_id': req.params.id, 'createdBy': ObjectId(req.userId)}, {}, function(err, workout){
            if (err){
                console.error('Error finding workout'+ err);
                res.json({ 'status': false });
                return;
            } 
            var json = req.body;

            workout.name = json.name;
            workout.notes = json.notes;
            workout.createdBy = workout.createdBy;
            if(json.isCompleted && !workout.isCompleted){
                workout.completedAt = new Date();
            }
            workout.isCompleted = json.isCompleted;


            if(json.type == 'RUNNING'){
                workout.distance = json.distance;
            }
            else if (json.type == 'STRENGTH_TRAINING'){
                workout.guide = json.guide;
                workout.exercises =  json.exercises; //just replace the whole thing.
            }
            
            workout.save(function(error, workout){
                if(error) { 
                    console.log("Error updating workout. "+error);
                    res.json({ 'status': false });
                    return;
                }
            });
        });
        res.json({ 'status': true });
    });

    app.delete('/api/workouts/:id', function(req, res){
        console.log('DELETE /api/workout/%s', req.params.id);
        Workout.remove({_id: req.params.id, 'createdBy': ObjectId(req.userId)}, function(err){
            if(err){
                console.log("Error occurred removing workout: %s", err);
                res.sendStatus(404);
            }
            res.sendStatus(200);
        });
    });

    app.get('/api/workouts/previous/:guideid', function(req, res){
        var guideId = req.params.guideid;
        console.log("Getting previous workouts from guide:" +guideId);
        StrengthTrainingWorkout.
            find({'createdBy': ObjectId(req.userId), isCompleted: true})
            .where('guide').equals(ObjectId(guideId))
            .limit(2)
            .sort({completedAt: 'desc'})
            .exec(function(err, workouts){
                if(err){
                    console.log("Could not find previous workouts: %s", err);
                    res.sendStatus(404);
                }
                res.json(workouts);
            });
    });

        



}