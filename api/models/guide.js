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
    },
    order: {
        type: Number,
        required: true
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
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    exercises: [ExerciseSchema]
}, 
{ 
    timestamps: true
});

exports.GuideSchema = GuideSchema;
exports.ExerciseSchema = ExerciseSchema;
module.exports =  mongoose.model('Guide', GuideSchema);