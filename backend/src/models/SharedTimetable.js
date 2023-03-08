const mongoose = require('mongoose');

// Define a new schema
const sharedTimetableSchema = new mongoose.Schema({
    name: String,
    participants: [String], // array of studentIds
});

// Create a model from the schema, which will be used to create documents
const SharedTimetable = mongoose.model('sharedTimetable', sharedTimetableSchema);

module.exports = {
    sharedTimetableSchema,
    SharedTimetable
};
