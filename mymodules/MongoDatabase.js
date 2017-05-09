/**
 * Created by giorgim on 3/19/17.
 *
 * Class which takes care of interacting with Mongo DB, and performing CRUD
 * operations on it.
 *
 */

const MongoClient = require('mongodb').MongoClient;
const MongoDB = require('mongodb');

/*
 * Some constant parameters.
 * */
const URL = 'mongodb://localhost:27017/Movies';
const COLLECTION_NAME = "movies";

/*
 * Constructor for our mongo database class.
 * */
function MongoDatabase()
{
    this.db = null;
}

/*
 * Connect to mongo database.
 * */
MongoDatabase.prototype.connect = function(success, failure){

    let that = this;

    // Connect
    MongoClient.connect(URL, function (err, db) {

        // Was there an error during connecting?
        if(err)
        {
            // Call failure callback function.
            failure(err);
            return;
        }

        that.db = db;

        // Call success callback function.
        success();

    });
}

/*
 * Insert movie to mongo database.
 * */
MongoDatabase.prototype.addOne = function(movie, success, failure)
{
    if(!this.db)
        throw new Error("Database not connected yet");

    // Insert a single document
    this.db.collection(COLLECTION_NAME).insertOne(movie, function(err, r) {
        if(err)
        {
            failure(err);
            return;
        }

        success();

    });
}

/*
 * Update movie in database.
 * */
MongoDatabase.prototype.updateOne = function(id, movie, success, failure)
{
    let o_id = new MongoDB.ObjectID(id);

    if(!this.db)
        throw new Error("Database not connected yet");

    // Do an update
    this.db.collection(COLLECTION_NAME).updateOne({"_id":o_id}, {$set:movie}, function(err, r) {
        if(err)
        {
            failure(err);
            return;
        }

        success();

    });
}

/*
 * Delete single movie from the database using Object ID.
 * */
MongoDatabase.prototype.deleteOneMovieUsingID = function(id, success, failure)
{
    let o_id = new MongoDB.ObjectID(id);

    if(!this.db)
        throw new Error("Database not connected yet");

    // Delete a single document
    this.db.collection(COLLECTION_NAME).deleteOne({"_id": o_id}, function(err, r) {
        if(err)
        {
            failure(err);
            return;
        }

        success();

    });
}

/*
 * Find movies using filter object.
 * */
MongoDatabase.prototype.findUsingFilter = function(movie, success, failure)
{

    if(!this.db)
        throw new Error("Database not connected yet");

    // If search is based on ID, we need to generate an Object ID using supplied ID,
    // and replace old ID using that one.
    if(movie["_id"])
    {
        movie["_id"] = new MongoDB.ObjectID(movie["_id"]);
    }

    // Do the search
    this.db.collection(COLLECTION_NAME).find(movie).toArray(function(err, documents) {
        if(err)
        {
            failure(err);
            return;
        }

        // If the id was specified during search, on the front end we expect an object instead of an array.
        if(movie["_id"]){
            success(documents[0]);
        }
            else{
            success(documents);
        }

    });
}




/*
 * Export instance of our mongo database class.
 * */
module.exports= new MongoDatabase();