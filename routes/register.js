
const express = require('express');
const path = require('path');
const { registerUser } = require('../controllers/authController');
const router = express.Router();

router.get('/showRegisterForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/registerForm.html'));
});
router.post('/api/register', registerUser);

module.exports = router;