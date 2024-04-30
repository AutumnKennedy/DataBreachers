require('dotenv').config();
const { MongoClient } = require("mongodb");
//const User = require('../models/user');

const uri = process.env.MONGODB_URI;


//Login User
const loginUser = async (req, res) => {

    const client = new MongoClient(uri);
    const{username, password} = req.query;

    async function run(){
        try {
            const database = client.db('DataBreachers');
            const collection = database.collection('Authorization');

            const query = {username: username, password: password};
            console.log("Queried username and Passoword" + username + password);

            //const user = await User.findOne(query);
            const user = await collection.findOne(query);
            console.log("awaiting collection");
            console.log(user);
            console.log(password);

          if (user!= null){
            res.send('Found this user: ' + JSON.stringify(user));
            
          }
          
          if (user == null){
            res.send('User not found');
          }
        } catch{
          console.log("Cannot connect to DataBase");
        }
        finally{
          await client.close();
        }
        
      }
      run().catch(console.dir);
}

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
            res.send('User creation was successful!');
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