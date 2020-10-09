var mongoose = require("mongoose");

var todoTaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('TodoTask', todoTaskSchema);