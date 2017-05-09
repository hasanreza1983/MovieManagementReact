/*
 * Created by giorgim on 5/6/17.
 *
 * Component which simply represents our main page.
 *
 */

import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class MainPage extends Component {

    constructor(props)
    {
        super(props);
        this.addMovie = this.addMovie.bind(this);
        this.listMovies = this.listMovies.bind(this);
        this.search = this.search.bind(this);

    }

    addMovie()
    {
        /* Move to the add new movie page */
        this.props.router.push('/addmovie');
    }

    listMovies()
    {
        /* Move to the list movies page */
        this.props.router.push('/listmovies');
    }

    search(){
        /* Move to the search movies page */
        this.props.router.push('/searchmovies');
    }

    render() {

        let that = this;

        const style = {
            margin: 12,
        };

        return (
            <div>
                <h1>Welcome to movie management application</h1>
                <p>Using this web application you can perform various
                CRUD operations on movie objects, like add new movies,
                edit existing movies, find movies, etc.</p>

                <RaisedButton label="Add new movie" primary={true} onClick = {that.addMovie} style={style}/>
                <RaisedButton label="List all movies" primary={true}  onClick = {that.listMovies}  style={style}/>
                <RaisedButton label="Search movies" primary={true} onClick = {that.search}  style={style} />

            </div>
        );
    }
}

