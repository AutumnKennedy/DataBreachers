const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const Topic = require('./topic');

const subscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic' }
});

module.exports = mongoose.model('Subscription', subscriptionSchema);
