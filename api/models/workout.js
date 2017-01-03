var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;



var WorkoutSchema = new Schema(
{
    name: {
        type: String, required: true, trim: true
    },
    workoutType: {
        type: ObjectId,
        ref: "WorkoutType",
        required: true
    },
    notes: {
        type: String, required: false, trim: true 
    },
    createdBy: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    completedAt: {
        type: Date
    }
}, 
{ 
    timestamps: true
});

exports.WorkoutSchema = WorkoutSchema;
module.exports = mongoose.model('Workout', WorkoutSchema);