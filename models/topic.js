const mongoose = require('mongoose');
const Message = require('./message');

const topicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Topic, topicSchema');