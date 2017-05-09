/**
 * Created by giorgim on 3/18/17.
 */
const express = require("express");
const qs = require('querystring');
const mongoDatabase = require("./mymodules/MongoDatabase");

/*
 * Serve static files from client app.
 * */
let app = express();
app.use(express.static(__dirname + "/client/build"));

/*
 * Initialise mongo connection
 * */
mongoDatabase.connect(function success(){}, function failure(){throw new Error("Error setting up database");});

/*
 * Add a new movie.
 * */
app.post('/addnewmovie', function(req, response){

    let bodyStr = '';

    // Start receiving data.
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });

    // Finished receiving data in body.
    req.on("end", function () {

        // Finished receiving body data which was string, now parse it, it contains data in URL encoded form.
        let requestBody = qs.parse(bodyStr);

        // Add movie to mongo database
        mongoDatabase.addOne({
            name: requestBody["name"],
            director: requestBody["director"],
            year: requestBody["year"]
        }, function(){
            // Success
            response.send(200);
        }, function (){
            response.status(400);
            response.send('Error inserting data');
        })



    });

});



/*
 * This is basically for editing a movie.
 * */
app.post('/editmovie', function(req, response){

    let bodyStr = '';

    // Start receiving data.
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });

    // Finished receiving data in body.
    req.on("end", function () {

        // We finished receiving body data which was URL encoded, now parse it.
        let requestBody = qs.parse(bodyStr);

        // Edit movie
        mongoDatabase.updateOne(requestBody["_id"], {
            name: requestBody["name"],
            director: requestBody["director"],
            year: requestBody["year"]
        }, function(){

            // Success
            response.send(200);

        }, function (){

            // Error
            response.status(400);
            response.send('Error editing movie');
        })



    });

});


/*
 * This is basically for searching a movie.
 * */
app.post('/searchmovies', function(req, response){

    let bodyStr = '';
    let movie = {};

    // Start receiving data.
    req.on("data", function (chunk) {
        bodyStr += chunk.toString();
    });

    // Finished receiving data in body.
    req.on("end", function () {

        let requestBody = qs.parse(bodyStr);

        // Create a search object.
        if(requestBody["name"]) movie.name = requestBody["name"];
        if(requestBody["director"]) movie.director = requestBody["director"];
        if(requestBody["year"]) movie.year = requestBody["year"];

        // search movies
        mongoDatabase.findUsingFilter(movie, function(docs){

            // Success
            response.send(docs);

        }, function (){

            // Error
            response.status(400);
            response.send('Error searching');
        })


    });

});



/*
 * Serve list of movies.
 * */
app.get("/listofmovies", function(request, response){

    // Search all movies, by passing an empty object as a filter.
    mongoDatabase.findUsingFilter({}, function(docs){

        // Success
        response.send(docs);

    }, function (){

        // Error
        response.status(400);
        response.send('Error searching');
    })

});

/*
 * Get movie with some ID
 * */
app.get("/listofmovies/:id", function(request, response){

    // search movies
    mongoDatabase.findUsingFilter({_id:request.params.id}, function(doc){

        // Success
        response.send(doc);

    }, function (){

        // Error
        response.status(400);
        response.send('Error searching');
    });

});

/*
 * Delete movie with some ID
 * */
app.get("/deletemovie/:id", function(request, response){

    mongoDatabase.deleteOneMovieUsingID(request.params.id, function(){

        // Success
        response.send(200);

    }, function (){

        // Error
        response.status(400);
        response.send('Error deleting movie');
    });
 });

app.get('*', function(req, res) {res.sendFile(__dirname + '/client/build/index.html');});


// Listen for requests.
app.listen(3000, function(){

    console.log('Listening on port 3000!')

});

