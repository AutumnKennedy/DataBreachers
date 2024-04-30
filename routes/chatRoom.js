const express = require('express');
const router = express.Router();
const { createTopic } = require('../controllers/topicController');

router.post('/createTopic', createTopic);

router.get('/chatroom', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile("chatRoom.ejs", { root: "./views" });
});

module.exports = router;
