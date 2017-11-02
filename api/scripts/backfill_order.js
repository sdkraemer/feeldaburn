conn = new Mongo()
db = conn.getDB("db");
guides = db.guides.find();
guides.forEach(function(guide) {
    //printjson( guide );
    for(var i=0; i<guide.exercises.length; i++) {
        var exercise = guide.exercises[i];
        db.guides.update(
            {"exercises._id" : exercise._id}, 
            { "$set": { "exercises.$.order": i} }
        );
    }
});