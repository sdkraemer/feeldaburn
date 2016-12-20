var User = require('./models/user');

module.exports = function(req, res, next) {
    console.log("Trying to find userID in userId.js");
    if (req.user) {
        try {
            console.dir(req.user);
            User.findOne({'auth0UserId': req.user.sub}, {},  function(err, user){
                if(err){
                    console.log("Could not find user from auth user: "+req.user.sub);
                }
                console.log("Found user: %j", user);
                req.userId = user._id;
                return next();
            });
        } catch (err) {
            return next();
        }
    } else {
        next();
    }
};