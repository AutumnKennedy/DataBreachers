
const express = require('express');
const path = require('path');
const { loginUser } = require('../controllers/authController');
const router = express.Router();

router.get('/showLogInForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/loginForm.html'));
});

router.get('/logInRender', loginUser);

module.exports = router;
