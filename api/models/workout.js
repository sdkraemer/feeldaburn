var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var SetSchema = new Schema({
    repetitions: {
        type: Number,
    },
    weight: {
        type: Number
    },
    side: {
        type: String,
        enum: ['LEFT', 'RIGHT', 'NONE'],
        default: 'NONE'
    },
    adjustWeight: {
        type: String,
        enum: ['NONE', 'INCREASE', 'DECREASE'],
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
    sets: [SetSchema],
    type: {
        type: String,
        enum: ['REPS', 'WEIGHTS', 'COMPLETED'],
        default: 'REPS'
    },
    isCompleted: {
        type: Boolean,
        required: false
    }
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
        type: String, required: false, trim: true
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
    isCompleted: {
        type: Boolean,
        required: false
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