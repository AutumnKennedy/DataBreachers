require('dotenv').config();
const { MongoClient } = require("mongodb");
//const User = require('../models/user');
const { v4: uuidv4 } = require('uuid');


const uri = process.env.MONGODB_URI;


//Login User
const loginUser = async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();

        const { username, password } = req.query;
        const database = client.db('DataBreachers');
        const collection = database.collection('Authorization');

        const query = { username: username, password: password };
        console.log("Queried username and Password: ", username, password);

        const user = await collection.findOne(query);
        console.log("User:", user);

        if (user != null) {
            const authToken = uuidv4();
            res.cookie('authToken', authToken, { 
                maxAge: 60000, 
                httpOnly: true
            });
            console.log("AuthToken:", authToken);
            res.redirect('/dashboard');
        } else {
            res.send('User not found');
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send('Internal server error');
    } finally {
        // Close the MongoDB client connection
        await client.close();
    }
};

//Register User
const registerUser = async (req, res) => {
    const { username, password } = req.body;
  
    const client = new MongoClient(uri);

    async function run() {
        try {
        const database = client.db('DataBreachers');
        const users = database.collection('Authorization');

        const userExists = await users.findOne({username});

        if (userExists) {
            res.send('Username is already taken.');
            return;
        } else{
            await users.insertOne({ username, password });
            res.send('User creation was successful!' + `<a href="/showLogInForm"> Login.</a>`);
        }
        } finally {
        await client.close();
        }
    }

    run().catch(console.dir);
}

module.exports = {
    loginUser,
    registerUser
};