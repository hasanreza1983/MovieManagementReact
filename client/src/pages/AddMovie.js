/*
 * Created by giorgim on 5/6/17.
 *
 * Component which represents a page for entering new movie details
 * or editing existing movie.
 *
 */

import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import $ from "jquery"

export default class AddMovie extends Component {
    constructor(props) {

        super(props);

        this.addMovie = this.addMovie.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.editMode = false;

        /* start with a blank state */
        this.state = {
            _id: "",
            name: "",
            director: "",
            year: ""
        }
    }

    componentDidMount() {

        let state= {
            _id: "",
            name: "",
            director: "",
            year: ""
        };

        /* Get query string from the address bar */
        let query = this.props.location.query;

        if(!query){
            return;
        }

        /* Decide if we are in add or edit mode? */
        this.editMode = query.id ? true : false;

        if(!this.editMode){
            return;
        }

        /* Copy data from query to the state. */
        state._id = query.id ? query.id : "";
        state.name = query.name ? query.name : "";
        state.director = query.director ? query.director : "";
        state.year = query.year ? query.year : "";

        /* Update state*/
        this.setState(state);

    }

    /*
     * Handler for the save movie button.
     */
    addMovie() {

        let that = this;

        /* Are we in add or edit mode? */
        if(!this.editMode) {

            /* We are in add mode, send proper request to the server. */
            $.ajax({
                type: 'POST',
                url: '/addnewmovie',
                data: that.state,
                success: function (msg) {
                    /* Movie was added go to main page. */
                    that.props.router.push('/');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
        }else {

            $.ajax({
                type: 'POST',
                url: '/editmovie',
                data: that.state,
                success: function(msg){
                    /* Movie was edited go to main page. */
                    that.props.router.push('/');
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
        }

    }

    handleInputChange(e) {

        /* Handle update of state variables (for controlled components) */
        const value = e.target.value;
        const name = e.target.name;
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
                <h1>Please enter details of movie</h1>
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
                <RaisedButton label="Save"
                              primary={true}
                              style={style}
                              onClick={that.addMovie}
                />

            </div>
        );
    }
}

