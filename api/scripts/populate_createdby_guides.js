var conn = new Mongo();
var db = conn.getDB("db");
db.guides.updateMany(
    {}, 
    {$set: 
        {"createdBy": ObjectId("593efbeac94b76000e047422")}
    }
);