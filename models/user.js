const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    topicsSubscribed: [{ type: Schema.Types.ObjectId, ref: 'Topic' }]
});

module.exports = mongoose.model('User', userSchema);