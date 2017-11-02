var mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;

var WeightMeasurement = new Schema({
    weight: {
        type: Number,
        required: true
    }
});

var MeasurementSchema = new Schema(
{
    type: {
        type: String,
        required: true
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
},
{
    discriminatorKey: 'type'
});

exports.MeasurementSchema = MeasurementSchema;
var Measurement = mongoose.model('Measurement', MeasurementSchema);

var WeightMeasurement = Measurement.discriminator('WEIGHT', WeightMeasurement);

module.exports = {
    'Measurement': Measurement,
    'WeightMeasurement': WeightMeasurement
};