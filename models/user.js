const mongoose = require('mongoose');
const Topic = require('./topic');

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    topicsSubscribed: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;