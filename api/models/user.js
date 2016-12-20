var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name: {
        type: String
    },
    auth0UserId: {
        type: String, required: true
    } 
});

exports.UserSchema = UserSchema;
module.exports =  mongoose.model('User', UserSchema);