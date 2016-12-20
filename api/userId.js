var User = require('./models/user');

module.exports = function(req, res, next) {
    if (req.user) {
        try {
            console.dir(req.user);
            User.findOne({'auth0UserId': req.user.sub}, {},  function(err, user){
                if(err){
                    console.log("Could not find user from auth user: "+req.user.sub);
                }
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