var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var GuideSchema = new Schema(
{
    name: {
        type: String, required: true, trim: true
    },
    description: {
        type: String, required: false, trim: true 
    }
}, 
{ 
    timestamps: true
});

exports.GuideSchema = GuideSchema;
module.exports =  mongoose.model('Guide', GuideSchema);