var Status = require("../models/status");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var _ = require("lodash");

module.exports = function(app) {
  app.get("/api/statuses", function(req, res) {
    var predicates = { createdBy: ObjectId(req.userId) };
    Status.find(predicates)
      .sort({ createdAt: "desc" })
      .exec(function(err, statuses) {
        if (err) {
          console.log("Could not find statuses: %s", err);
          res.sendStatus(404);
        }
        res.json(statuses);
      });
  });

  app.post("/api/statuses", function(req, res) {
    var data = req.body;
    var status = new Status({
      message: data.message,
      createdBy: ObjectId(req.userId)
    });
    status.save(function(err, status) {
      if (err) {
        console.log("Error inserting new status: " + err);
      }
      res.json(req.body);
    });
  });
};
