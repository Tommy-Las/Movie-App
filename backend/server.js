//SERVER REQUIREMENTS
require('dotenv').config();

const express = require("express");
const app = express();

const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { default: axios } = require('axios');

//database global variable
let dbo = ''
// will store the MongoDB database collection after it is loaded (see bottom of file)
let collection = null;

const firebase_app = require('firebase-admin/app');
const firebase = require('firebase-admin');
//start the firebase app with the google credentials 
firebase_app.initializeApp({
  "apiKey": process.env.FIREBASE_API_KEY,

  "authDomain": process.env.FIREBASE_AUTH_DOMAIN,

  "projectId": process.env.FIREBASE_PROJECT_ID,

  "storageBucket": process.env.FIREBASE_STORAGE_BUCKET,

  "messagingSenderId": process.env.FIREBASE_SENDER_ID,

  "appId": process.env.FIREBASE_APP_ID
})

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  
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

  //Firebase Authentication 
  function checkAuth(req, res, next) {
    function throwAuthError(message, status = 403) {
        res.status(status).send({ message: "Auth Error: " + message });
    }
    let token = req.headers.authorization;
    //empty token
    if (!token) {
        return throwAuthError("Missing authorization header", 401);
    }
    firebase.auth().verifyIdToken(token)
        .then(decoded => {
            // attach auth info to request:
            console.log('authorized request')
            req.user = decoded;

            // continue on
            next();
        })
        .catch(err => {
            console.log(err.message);
            throwAuthError("Invalid ID token", 403);
        })
}

  //connect to database globally
  MongoClient.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@bear-movies.0gpaj6o.mongodb.net/?retryWrites=true&w=majority` , (err, client) => {
    if (err) {
        console.error("Unable to connect to MongoDB: ", err.message);
        throw err; // exits program - mongo error
    } else {
        console.log('connected to database')
        //database name
        dbo = client.db(process.env.MONGODB_DATABASE);
        //database collection
        collection = dbo.collection(process.env.MONGODB_COLLECTION);
    }
})

//API CALLS TO IMBD

/** * 
 * GET request endpoint to /top250 that will make an API call to IMBd to request the top250 movies
 * returns an array of movie objects
 */
app.get("/top250", checkAuth, (req, res) => {
    // API call for top 250 movies
    axios.get("https://imdb-api.com/en/API/Top250Movies/" + process.env.IMBD_KEY).then((response) => {
        res.status(200).send(response.data.items)
    }).catch((error) => {
        console.dir(error)
        res.status(500).send(error)
    })
})

/**
 * GET request endpoint to /search/:movie_name that will make an API call to search for a movie based on its name
 * The movie title will be received as a parameter
 * returns an array of movie objects
 */
app.get("/search/:movie_name", checkAuth, (req, res) => {
    var movie_name = req.params.movie_name;
    console.log(movie_name)

    axios.get("https://imdb-api.com/en/API/SearchMovie/" + process.env.IMBD_KEY + "/" + movie_name, {}).then((response) => {
        res.status(200).send(response.data)
    }).catch((error) => {
        console.dir(error)
        res.status(500).send(error)
    })
})

/**
 * GET request endpoint to /movie/:movie_id that will make an API call to obtain movie information of the given movie id
 * The movie id will be received as a parameter
 * returns an object with all the movie information
 */
app.get("/movie/:movie_id", checkAuth, (req, res) => {
    var movie_id = req.params.movie_id;

    axios.get("https://imdb-api.com/en/API/Title/" + process.env.IMBD_KEY + "/" + movie_id, {}).then((response) => {
        res.status(200).send(response.data)
    }).catch((error) => {
        console.dir(error)
        res.status(500).send(error)
    })
})

/**
 * GET request endpoint to /images/:movie_id that will make an API call to obtain images of the given movie id
 * The movie id will be received as a parameter
 * returns an object with all the movie images in an array
 */

app.get("/images/:movie_id", checkAuth, (req, res) => {
    var movie_id = req.params.movie_id;

    axios.get("https://imdb-api.com/en/API/Images/" + process.env.IMBD_KEY + "/" + movie_id + "/Short", {}).then((response) => {
        res.status(200).send(response.data)
    }).catch((error)=>{
        console.dir(error)
        res.status(500).send(error)
    })
})

//DATABASE FUNCTIONS

/**
 * POST request endpoint to /watchlist/add to add a movie to the users watchlist
 * it receives as parameter the user_id, the movie_id and image of the movie added to the watchlist
 * returns a success or error message
 */
app.post("/watchlist/add", (req, res) => {
  //filter by user_id of the current user
  let filter = {
    "_id": req.query._id
  }
  //values to be added to the array (watchlist)
  //query that adds that object to the movies array
  let new_vals = { $push: { 'movies': {movie_id: req.query.movie_id, image: req.query.image}}}
  
  collection.updateOne(filter, new_vals, (err, response) =>{
    if(err){
      console.log("Cannot add movie.")
      return res.status(404).send(err)
    }else{
      console.log("Movie " + req.query.movie_id + " added successfully!")
      return res.status(200).send(response);
    }
  })
})

/**
 * POST request endpoint to /watchlist/:uid to create a watchlist for that given user_id
 * receives as parameter the user_id
 * returns a success or error response
 */
app.post("/watchlist/:uid", (req, res) => {
  //filter by user_id of the current user
  let obj = {
    "_id": req.params.uid,
  }
  collection.insertOne(obj, (err, response) =>{
    if(err){
      console.log("User already has a watchlist.")
    }else{
      console.log("User " + obj._id + " created successfully")
      return res.status(200).send(response);
    }
  })
})

/**
 * GET request endpoint to /watchlist/:uid to receive the user's watchlist
 * receives as parameter the user_id
 * returns an array with a single object, which contains the user_id and the array of movies (watchlist)
 */
app.get("/watchlist/:uid", checkAuth, (req, res) => {
  //filter by user_id of the current user
  let filter = {
    _id: req.params.uid
  }
  collection.find(filter).toArray(function(err, array) {
    if (err) throw err;
    return res.status(200).send(array);
  });
})

/**
 * GET request endpoint to /watchlist to check whether a movie is in a watchlist from a given user
 * receives as parameter the user_id, and the id of the movie that needs to be checked 
 * returns true if the movie is in the watchlist, false if the movie is not in the watchlist
 */
app.get("/watchlist", (req, res) => {
  let filter = {
    _id: req.query.uid,
    //query to check for a movie in the array
    movies: {$elemMatch : {movie_id : req.query.movie_id}}
  }
  collection.find(filter).toArray(function(err, array) {
    if (err) throw err;
    if(array.length > 0){
      return res.status(200).send(true);
    }
    else{
      return res.status(200).send(false);
    }
  });
})

/**
 * DELETE request endpoint to /watchlist to remove a movie in a watchlist from a given user
 * receives as parameter the user_id, and the id of the movie that needs to be removed
 * returns a success or error response
 */
app.delete("/watchlist", (req, res) => {
  //filter by user_id of the current user
  let filter = {
    _id: req.query.uid
  }
  //values to be removed to the array (watchlist)
  //query removes adds that object from the movies array
  let new_vals = { $pull: { 'movies': {movie_id: req.query.movie_id}}}
  collection.updateOne(filter, new_vals, (err, response) =>{
    if(err){
      console.log("Movie was not removed.")
      return res.status(404).send(err)
    }else{
      console.log("Movie removed successfully")
      return res.status(200).send(response);
    }
  })
})

//START THE SERVER
app.listen(process.env.PORT, () => {
    console.log("Express App listening on port " + process.env.PORT);
})