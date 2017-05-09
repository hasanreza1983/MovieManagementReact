/*
 * Created by giorgim on 5/6/17.
 *
 * Represents a page which allows user to search movies.
 */

import React, { Component } from 'react';
import MovieList from "../components/MovieList"
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from "jquery"

export default class SearchMovies extends Component {

    constructor(props)
    {
        super(props);

        this.search = this.search.bind(this);
        this.deleteHandler = this.deleteHandler.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            name: "",
            director: "",
            year: "",
            movies:[]
        }
    }

    deleteHandler(id) {

        let that = this;

        /* Delete movie with that ID */
        $.get("/deletemovie/" + id, function(data, status) {

            /* Launch search again */
            that.search();

        });



    }

    /*
     * User wants to do search.
     *
     */
    search(){
        let that = this;

        $.ajax({
            type: 'POST',
            url: '/searchmovies',
            data: {
                name:that.state.name,
                director:that.state.director,
                year:that.state.year
            },
            success: function (movies) {

                /* Now, update the state. */
                that.setState({movies:movies});

            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(textStatus);
            }
        });

    }

    /*
     * Called when user types something in input fields.
     *
     */
    handleInputChange(e) {

        /* Get value of target component */
        const value = e.target.value;

        /* Get name attribute of component which was changed */
        const name = e.target.name;

        /* Store data entered in text box in state - this is a controlled element */
        this.setState({
            [name]: value
        });
    }

    render() {

        let that = this;
        const style = {
            margin: 12,
        };

        return (
            <div>
                <h1>Please enter search information</h1>
                <TextField hintText="Movie name" style={style}
                           onChange={that.handleInputChange}
                           name="name"
                           value={that.state.name}/><br />
                <TextField hintText="Director" style={style}
                           onChange={that.handleInputChange}
                           name="director"
                           value={that.state.director}/><br />
                <TextField hintText="Year" style={style}
                           onChange={that.handleInputChange}
                           name="year"
                           value={that.state.year}/><br />
                <RaisedButton label="Search"
                              primary={true}
                              style={style}
                              onClick={that.search}
                />
                <MovieList movies = {that.state.movies} deleteHandler = {that.deleteHandler}/>
            </div>
        );
    }
}

