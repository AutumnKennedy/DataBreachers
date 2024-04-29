require('dotenv').config();
const { MongoClient } = require("mongodb");
const fs = require('fs');
const express = require("express");
const app = express();
const port = 3000;

const uri = process.env.MONGODB_URI;


app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routers
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');


//Routes go here:

//Default
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./views" });
});

//Log in
app.use('/', loginRoutes);

//Register
app.use('/', registerRoutes);


