var Guide = require('../models/guide');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = function(app) {
    app.get('/api/guides', function(req, res){
        Guide.find({},function(err, guides){
            if (err) return console.error(err);
            res.json(guides);
        });
    });

    app.post('/api/guides', function(req, res){
        var guide = new Guide({
                            name: req.body.name, 
                            description: req.body.description
                        });
        guide.save(function(err, guide){
            if(err) { console.log('Error inserting new guide: '+err); }
            res.json(req.body);
        });
    });

    app.get('/api/guides/:id', function(req, res){
        Guide.findOne({ '_id': req.params.id }, {}, function (err, guide) {
            res.json(guide);
        });

    });

    app.put('/api/guides/:id', function(req, res){
        Guide.findOne({'_id': req.params.id}, {}, function(err, guide){
            if (err) return console.error(err);

            guide.name = req.body.name || guide.name;
            guide.description = req.body.description || guide.description;
            guide.createdBy = guide.createdBy;

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