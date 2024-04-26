const mongoose = require('mongoose');
const User = require('./user');

const message = new mongoose.Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message, messageSchema');