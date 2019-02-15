conn = new Mongo();
db = conn.getDB("db");
guides = db.getCollection("guides").find({ "exercises.type": "WEIGHTS" });

guides.forEach(function(guide) {
  //printjson( guide );
  for (var i = 0; i < guide.exercises.length; i++) {
    var exercise = guide.exercises[i];

    if (exercise.type == "WEIGHTS") {
      db.guides.update(
        { "exercises._id": exercise._id },
        { $set: { "exercises.$.type": "REPS_WEIGHTS" } }
      );
    }
  }
});
