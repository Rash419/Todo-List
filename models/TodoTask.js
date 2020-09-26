var mongoose = require("mongoose");

var todoTaskSchema = new mongoose.Schema({
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('TodoTask',todoTaskSchema);