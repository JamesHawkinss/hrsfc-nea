const mongoose = require('mongoose');

const SharedTimetableSchema = new mongoose.Schema({
    name: String,
    participants: [String], // array of studentIds
});

const SharedTimetable = mongoose.model('sharedTimetable', SharedTimetableSchema);

module.exports = {
    SharedTimetableSchema,
    SharedTimetable
};
