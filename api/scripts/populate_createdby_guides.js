var conn = new Mongo();
var db = conn.getDB("db");
db.guides.updateMany(
    {}, 
    {$set: 
        {"createdBy": ObjectId("5a01d8a756eb68000ece6fa2")}
    }
);