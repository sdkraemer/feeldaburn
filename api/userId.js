var User = require('./models/user');

module.exports = function(req, res, next) {
    console.log("req.user: %j", req.user);
    if (req.user) {
        try {
            User.
                findOne({'auth0UserId': req.user.sub}, {}, function(err, user){
                    if(err){
                        console.log("Could not find user: %s", err);
                        res.sendStatus(404);
                    }
                    if(user){
                        req.userId = user._id;
                    }
                    return next();
                });
        } catch (err) {
            console.log("userId error: %s", err);
            return next();
        }
    } else {
        next();
    }
};