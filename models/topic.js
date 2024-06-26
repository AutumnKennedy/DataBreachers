const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('./message');

const topicSchema = new Schema({
    title: {type: String, required: true},
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('Topic', topicSchema);
