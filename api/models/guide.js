var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ExerciseSchema = new Schema({
    name: {
        type: String, required: true, trim: true
    },
    sided: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ['REPS', 'WEIGHTS', 'COMPLETED', 'SECONDS'],
        default: 'COMPLETED'
    }
});

var GuideSchema = new Schema(
{
    name: {
        type: String, required: true, trim: true
    },
    description: {
        type: String, required: false, trim: true 
    },
    exercises: [ExerciseSchema]
}, 
{ 
    timestamps: true
});

exports.GuideSchema = GuideSchema;
exports.ExerciseSchema = ExerciseSchema;
module.exports =  mongoose.model('Guide', GuideSchema);