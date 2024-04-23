const mongoose = require('mongoose');
const User = require('./user');
const Topic = require('./topic');

const subscriptionSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic' }
});

module.exports = mongoose.model('Subscription, subscriptionSchema');