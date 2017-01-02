var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var StrengthTrainingWorkoutSchema = new Schema({
    guide: {
        type: String,
        required: true
    },
    exercises: [ExerciseSchema]
});

var RunningWorkoutSchema = new Schema({
    distance: {
        type: Number,
        required: true
    }
});

var WorkoutSchema = new Schema(
{
    name: {
        type: String, required: true, trim: true
    },
    type: {
        type: String,
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
},
{
    discriminatorKey: 'type'
});

exports.WorkoutSchema = WorkoutSchema;
module.exports =  mongoose.model('Workout', WorkoutSchema);
exports.StrengthTrainingWorkout = Workout.discriminator('STRENGTH_TRAINING', StrengthTrainingWorkoutSchema);
exports.RunningWorkout = Workout.discriminator('Running', RunningWorkoutSchema);