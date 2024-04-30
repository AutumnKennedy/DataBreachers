
const express = require('express');
const path = require('path');
const { loginUser} = require('../controllers/authController');
//const extractTokenFromCookie = require('../middlewares/extractToken');
const router = express.Router();
router.get('/showLogInForm', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/loginForm.html'));
});
router.get('/logInRender', (req, res) => {
    loginUser(req, res);
});
// router.get('/dashboard.html', extractTokenFromCookie, (req, res) => {
//     res.sendFile('dashboard.html', { root: './views' });
// });
router.get('/dashboard', (req, res) => {
    res.sendFile("dashboard.html", { root: "./views" })
});

module.exports = router;
