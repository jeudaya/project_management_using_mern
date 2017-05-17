var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var projectSchema = new Schema({
    project_name: { type: String, trim: true, unique: true, required: true },
    project_description: { type: String, trim: true, required: true },
    addedDate: { type: Date }
}, { collection: "project_data" });

module.exports = mongoose.model('project', projectSchema);
