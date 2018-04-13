var User = require('../models/user');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = function(app) {
    app.post('/api/users', function(req, res){
        var auth0UserId = req.user.sub;
        console.log("POST /api/users ... auth0UserId: %s",  req.user.sub)
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
                    //res.json(user);
                });
            }
            res.json(user);
        });
    });

}