//Topic Controller
const Topic = require('../models/topic');

const createTopic = async (req, res) => {
    const {title} = req.body;

    try {
        const topic = new Topic({ title });
        
        await topic.save();

        //res.status(201).send('Topic created successfully');
        res.redirect('/chatroom');
        console.log(topic);
    } catch (error) {
        console.error('Error creating topic:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports = { createTopic };