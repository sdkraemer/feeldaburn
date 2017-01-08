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

var StrengthTrainingWorkoutTypeSchema = new Schema({
    guide: {
        type: ObjectId,
        ref: "Guide",
        required: true
    },
    exercises: [ExerciseSchema]
});

var RunningWorkoutTypeSchema = new Schema({
    distance: {
        type: Number,
        required: true
    }
});

var WorkoutTypeSchema = new Schema(
    {
        workoutType: {
            type: String,
            required: true
        }
    },
    {},
    {
        discriminatorKey: 'workoutType'
    });

var WorkoutType = mongoose.model('WorkoutType', WorkoutTypeSchema);
var StrengthTrainingWorkoutType = WorkoutType.discriminator('STRENGTH_TRAINING', StrengthTrainingWorkoutTypeSchema);
var RunningWorkoutType = WorkoutType.discriminator('RUNNING', RunningWorkoutTypeSchema);

module.exports = {
    "WorkoutType": WorkoutType,
    "StrengthTrainingWorkoutType": StrengthTrainingWorkoutType,
    "RunningWorkoutType": RunningWorkoutType
}
