require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
var cookieParser = require('cookie-parser');
const app = express();
class Database{
  
    constructor(){
      if(!Database.instance){
        this.uri = process.env.MONGODB_URI;
        mongoose.connect(this.uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log('Connected to MongoDB');
        })
        .catch((error) => {
          console.error('Error connecting to MongoDB:', error);
        });
        Database.instance = this;
    
      }
      return Database.instance;
    }
    }    module.exports = new Database();
    // const databaseInstance = new Database();
