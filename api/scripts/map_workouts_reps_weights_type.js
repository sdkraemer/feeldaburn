conn = new Mongo();
db = conn.getDB("db");
workouts = db.getCollection("workouts").find({ "exercises.type": "WEIGHTS" });

workouts.forEach(function(workout) {
  //printjson( workout );
  for (var i = 0; i < workout.exercises.length; i++) {
    var exercise = workout.exercises[i];

    if (exercise.type == "WEIGHTS") {
      db.workouts.update(
        { "exercises._id": exercise._id },
        { $set: { "exercises.$.type": "REPS_WEIGHTS" } }
      );
    }
  }
});
