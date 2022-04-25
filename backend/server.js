//SERVER REQUIREMENTS
require('dotenv').config();

const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { default: axios } = require('axios');

// will store the MongoDB database collection after it is loaded (see bottom of file)
let collection = null;

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    if (!collection) {
        console.log("Database not loaded!");
        res.status(503).send({ message: "Please try again shortly" });
    } else {
        // Pass to next layer of middleware
        next();
    }
  });

  //connect to database globally
  MongoClient.connect(`mongodb://${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/`, (err, client) => {
    if (err) {
        console.error("Unable to connect to MongoDB: ", err.message);
        throw err; // exits program - mongo error
    } else {
        let dbo = client.db(process.env.MONGODB_DATABASE);
        collection = dbo.collection(process.env.MONGODB_COLLECTION);
    }
})

const searchMovie = (search_value) => {
    axios.get("https://imdb-api.com/en/API/SearchMovie/k_3o4z5xk9/" + search_value, {}).then((response) => {
        console.dir(response)
        return response
    }).catch((error)=>{
        console.dir(error)
        return error
    })
}

const movieInformation = (movie_id) => {
    axios.get("https://imdb-api.com/en/API/Title/k_3o4z5xk9/" + movie_id, {}).then((response) => {
        console.dir(response)
        return response
    }).catch((error)=>{
        console.dir(error)
        return error
    })
}

const movieImages = (movie_id) => {
    axios.get("https://imdb-api.com/en/API/Images/k_3o4z5xk9/" + movie_id + "/Short", {}).then((response) => {
        console.dir(response)
        return response
    }).catch((error)=>{
        console.dir(error)
        return error
    })
}

//CORS FUNCTIONS
app.get("/top250", (req, res) => {
    //API call for top 250 movies
    axios.get("https://imdb-api.com/en/API/Top250Movies/k_3o4z5xk9", {}).then((response) => {
        console.dir(response)
        res.status(200).send(response)
    }).catch((error) => {
        console.dir(error)
        res.status(500).send(error)
    })
})

//DATABASE FUNCTIONS

//START THE SERVER
app.listen(process.env.PORT, () => {
    console.log("Express App listening on port " + process.env.PORT);
})