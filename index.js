require('dotenv').config();
const { MongoClient } = require("mongodb");
const fs = require('fs');
const express = require("express");
const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;

//Routers
const loginRouter = require('./routes/login');

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Using Routers
app.use('/', loginRouter);

//Default Route:
app.get("/", (req, res) => {
  fs.readFile("view/index.html", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading index.html");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  })
});


//Registering
app.get('/showRegisterForm', function(req,res){
  fs.readFile("view/registerForm.html", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Error reading registerForm.html");
        return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(data);
  });
});

app.post('/api/mongo/register', function(req, res) {
  const { username, password } = req.body;
  
  const client = new MongoClient(uri);

  async function run() {
    try {
      const database = client.db('DataBreachers');
      const users = database.collection('Authorization');

      const query = { username, password };

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
});


// Logging in
// app.get('/showLogInForm', function(req,res){
//   fs.readFile("view/logInForm.html", (err, data) => {
//     console.log("show log in form");
//     if (err) {
//         console.error("Error reading file:", err);
//         res.status(500).send("Error reading logInForm.html");
//         return;
//     }
//     res.setHeader('Content-Type', 'text/html');
//     res.send(data);
//   });
// });

// app.get('/logInRender' , function(req, res){
//   const client = new MongoClient(uri);
//   const{username, password} = req.query;
//   async function run(){
//     try{
//       const database = client.db('DataBreachers');
//       const collection = database.collection('Authorization');
//       const query = {username: username, password: password};
//       const output = await collection.findOne(query);
//       if (output!= null){

//         // res.send('Found this user: ' + JSON.stringify(output));
//         // // res.send(output);
//       }
//       if (output == null){
//         res.send('User not found');
//       }
//     } catch{
//       console.log("Cannot connect to DataBase");
//     }
//     finally{
//       await client.close();
//     }
    
//   }
//   run().catch(console.dir);
// })
//Test Database Access Route by querying for a username in our database (hint: admin is the only username currently in our database at the moment)
app.get('/api/test/:username', function (req, res) {
  const client = new MongoClient(uri);
  const searchKey = "{ username: '" + req.params.username +"'}";
  console.log("Searching for: " + searchKey);

  async function run() {
    try {
      const database = client.db('DataBreachers');
      const users = database.collection('Authorization');

      //const query = { username: 'admin'};
      const query = { username: req.params.username};

      const username = await users.findOne(query);
      console.log(username);
      res.send('Found this user: ' + JSON.stringify(username));

    } finally {
      await client.close();
    }
  }
  run().catch(console.dir);
});

