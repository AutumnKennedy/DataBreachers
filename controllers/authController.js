require('dotenv').config();
//const { MongoClient } = require("mongodb");
const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');
const logInObserver = require('../observers/logInObserver'); //may not work

const uri = process.env.MONGODB_URI;
const myObserver = new logInObserver();

//Login User
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.query;
        const query = { username: username, password: password };
        console.log("Queried username and Password: ", username, password);

        const user = await User.findOne({ username, password }).exec();
        console.log("User:", user);

        if (user != null) {
            myObserver.login();
            
            const authToken = uuidv4();
            res.cookie('authToken', authToken, { 
                maxAge: 60000, 
                httpOnly: true
            });
            console.log("AuthToken:", authToken);
            // myObserver.update("true");
            myObserver.notify();
            res.redirect('/dashboard');
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal server error');
    } 
};

//Register User
const registerUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
        const userExists = await User.findOne({ username }).exec();

        if (userExists) {
            res.send('Username is already taken.');
            return;
        } else {
            await User.create({ username, password });
            res.send('User creation was successful!' + `<a href="/showLogInForm"> Login.</a>`);
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal server error');
    }
};

module.exports = {
    loginUser,
    registerUser
};