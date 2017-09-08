var Guide = require('../models/guide');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var _ = require('lodash');

module.exports = function(app) {
    app.get('/api/guides', function(req, res){

        Guide.
            find({})
            .sort({name: 'asc'})
            .exec(function(err, guides){
                if(err){
                    console.log("Could not find guides: %s", err);
                    res.sendStatus(404);
                }
                res.json(guides);
            });
    });

    app.post('/api/guides', function(req, res){
        var data = req.body;
        var guide = new Guide({
            name: data.name, 
            description: data.description,
            createdBy: ObjectId(req.userId),
            exercises: []
        });
        if(data.exercises){
            data.exercises.forEach(function(exercise) {
                guide.exercises.push({
                    name: exercise.name,
                    sided: exercise.sided,
                    type: exercise.type,
                    order: exercise.order
                });
            }, this);
        }
        guide.save(function(err, guide){
            if(err) { console.log('Error inserting new guide: '+err); }
            res.json(req.body);
        });
    });

    app.get('/api/guides/:id', function(req, res){
        Guide.findOne({ '_id': req.params.id }, {}, function (err, guide) {
            var guideObject = guide.toObject();
            //sort exercises in ascending order
            guideObject.exercises.sort(function(a, b) {
                return a.order - b.order;
            });
            res.json(guideObject);
        });

    });

    app.put('/api/guides/:id', function(req, res){
        Guide.findOne({'_id': req.params.id}, {}, function(err, guide){
            if (err) return console.error(err);
            console.log("PUT existing guide data:", guide);

            var data = req.body;

            guide.name = data.name || guide.name;
            guide.description = data.description || guide.description;

            data.exercises.forEach(function(exercise) {
                if(exercise._id){
                    var dbExerciseIndex = _.findIndex(guide.exercises, function(e){
                        return e._id == exercise._id;
                    });

                    guide.exercises[dbExerciseIndex].name = exercise.name;
                    guide.exercises[dbExerciseIndex].sided = exercise.sided;
                    guide.exercises[dbExerciseIndex].type = exercise.type;
                    guide.exercises[dbExerciseIndex].order = exercise.order;

                }
                else{
                    exercise._id = new mongoose.Types.ObjectId;
                    guide.exercises.push(exercise);
                }
            }, this);

            guide.save(function(err, guide){
                if(err) { 
                    console.log("Error updating guide. "+err);
                    res.json({ 'status': false });
                }
                res.json({ 'status': true });
            });
        });
    });

    app.delete('/api/guides/:id', function(req, res){
        console.log('DELETE /api/guides/%s', req.params.id);
        Guide.remove({_id: req.params.id}, function(err){
            if(err){
                console.log("Error occurred removing guide: %s", err);
                res.sendStatus(404);
            }
            res.sendStatus(200);
        });
    });
}