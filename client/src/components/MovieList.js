/**
 * Created by giorgim on 5/6/17.
 *
 * Component responsible for displaying list of movies on the screen as table rows.
 * Receives the list of movies as props.movies
 * Also allows for editing/deleting movies.
 */

import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Link} from 'react-router';

export default class MovieList extends Component {

    render() {

        let that = this;

        return (
            <div>
                <Table>
                    <TableHeader displaySelectAll={false}>
                        <TableRow >
                            <TableHeaderColumn>Name</TableHeaderColumn>
                            <TableHeaderColumn>Director</TableHeaderColumn>
                            <TableHeaderColumn>Year</TableHeaderColumn>
                            <TableHeaderColumn>Edit</TableHeaderColumn>
                            <TableHeaderColumn>Delete</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {that.props.movies.map(function (movie) {
                            return (
                                <TableRow key={movie.id} selectable={false}>
                                    <TableRowColumn>{movie.name}</TableRowColumn>
                                    <TableRowColumn>{movie.director}</TableRowColumn>
                                    <TableRowColumn>{movie.year}</TableRowColumn>
                                    <TableRowColumn>
                                        <Link to={{pathname:"addmovie", query:{
                                            name:movie.name,
                                            id:movie._id,
                                            director:movie.director,
                                            year:movie.year

                                        }}}>
                                            <FlatButton
                                                primary={true}
                                                label="Edit"/>
                                        </Link>
                                    </TableRowColumn>
                                    <TableRowColumn>
                                        <FlatButton
                                            secondary={true}
                                            onClick={function () {
                                                that.props.deleteHandler(movie._id)
                                            }}
                                            label="Delete"/>
                                    </TableRowColumn>
                               </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>


            </div>
        );
    }
}

