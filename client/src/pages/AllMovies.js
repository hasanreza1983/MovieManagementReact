/*
 * Created by giorgim on 5/6/17.
 *
 * This component represents a page on UI which allows user to see all movies.
 */

import React, { Component } from 'react';
import MovieList from "../components/MovieList"
import $ from "jquery"

export default class AllMovies extends Component {

    constructor(props)
    {
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.state={
            movies:[]
        }
    }

    /*
     * Function which retrieves ALL movies and updates state accordingly.
     */
    getAllMovies(){

        let that = this;

        /* Get all movies from the server. */
        $.get("/listofmovies", function(movies, status){

            /* Set new state */
            that.setState({movies:movies});


        });
    }

    componentDidMount(){
        /* Load ALL movies */
        this.getAllMovies();
    }


    deleteHandler(id) {

        let that = this;

        /* Delete movie with that ID */
        $.get("/deletemovie/" + id, function(data, status) {

            /* load ALL movies again */
            that.getAllMovies();

        });



    }

    render() {

        let that = this;
        return (
           <div>
               <h1>List of movies</h1>
               <MovieList movies = {that.state.movies} deleteHandler={that.deleteHandler}/>
           </div>
        );
    }
}

