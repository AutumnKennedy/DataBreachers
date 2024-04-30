require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
var cookieParser = require('cookie-parser');
const app = express();
app.set('view engine', 'ejs');
const database = require('./Database.js')
database
// class Database{
// constructor(){
//   if(!Database.instance){
//     this.uri = process.env.MONGODB_URI;
//     mongoose.connect(uri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//       console.error('Error connecting to MongoDB:', error);
//     });
//     Database.instance = this;

//   }
//   return Database.instance;
// }
// }
// const database = new database9();



const port = 3000;

// const uri = process.env.MONGODB_URI;

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('Connected to MongoDB');
// })
// .catch((error) => {
//   console.error('Error connecting to MongoDB:', error);
// });


app.listen(port);
console.log('Server started at http://localhost:' + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


//Routers
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const topicRouter = require('./routes/chatRoom');
// const databaseInstance = require('./singleton');


//Routes go here:

//Default
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./views" });
});

//Log in
app.use('/', loginRoutes);

//Register
app.use('/', registerRoutes);

//Topics
app.use(topicRouter);

