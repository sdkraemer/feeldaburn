var MeasurementModels = require("../models/measurement"),
  Measurement = MeasurementModels.Measurement,
  WeightMeasurement = MeasurementModels.WeightMeasurement;
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var _ = require("lodash");

module.exports = function(app) {
  app.get("/api/measurements", function(req, res) {
    var conditions = {
      createdBy: ObjectId(req.userId)
    };
    Measurement.find(conditions).exec(function(err, measurements) {
      if (err) {
        console.log("Could not find measurements: %s", err);
        res.sendStatus(404);
      }
      res.json(measurements);
    });
  });

  app.post("/api/measurements", function(req, res) {
    var json = req.body;
    var measurement = new Measurement({
      type: json.type,
      weight: json.weight //Change this to value
    });
    measurement.createdBy = ObjectId(req.userId);
    measurement.createdAt = new Date();
    measurement.save(function(err, workout) {
      if (err) {
        console.log("Error inserting new measurement: " + err);
      }
      res.json(req.body);
    });
  });
};
