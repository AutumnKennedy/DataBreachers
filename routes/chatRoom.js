const express = require('express');
const path = require('path');
const { loginUser} = require('../controllers/authController');
//const extractTokenFromCookie = require('../middlewares/extractToken');
const router = express.Router();

router.get('/chatRoom', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/chatRoom.ejs'));
});
     

module.exports = router;