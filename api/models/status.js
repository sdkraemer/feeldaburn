var mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var StatusSchema = new Schema(
  {
    message: {
      type: String,
      required: false,
      trim: true
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
      required: true
    },
    createdAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

exports.StatusSchema = StatusSchema;
module.exports = mongoose.model("Status", StatusSchema);
