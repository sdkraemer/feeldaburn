var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SetSchema = new Schema({
    repetititons: {
        type: Number,
    },
    weight: {
        type: Number
    },
    side: {
        type: String,
        enum: ['LEFT', 'RIGHT', 'NONE'],
        default: 'NONE'
    }
});

var ExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    guideExercise: {
        type: ObjectId,
        ref: "Guide.exercises",
        required: true
    },
    sets: [SetSchema]
});

var StrengthTrainingWorkoutSchema = new Schema({
    guide: {
        type: ObjectId,
        ref: "Guide",
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
var Workout = mongoose.model('Workout', WorkoutSchema);

var StrengthTrainingWorkout = Workout.discriminator('STRENGTH_TRAINING', StrengthTrainingWorkoutSchema);
var RunningWorkout = Workout.discriminator('RUNNING', RunningWorkoutSchema);

module.exports = {
    'Workout': Workout,
    'StrengthTrainingWorkout': StrengthTrainingWorkout,
    'RunningWorkout': RunningWorkout
};