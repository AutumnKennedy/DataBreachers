require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const express = require("express");
const app = express();
const port = 3000;

app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes go here

//Default Route:
app.get("/", (req, res) => {
  res.send("Hello World!");
});

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

