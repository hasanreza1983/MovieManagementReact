import React, {Component} from 'react';
import MainPage from "./pages/MainPage"
import AddMovie from "./pages/AddMovie"
import AllMovies from "./pages/AllMovies"
import SearchMovies from "./pages/SearchMovies"
import {Router, Route, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router history={browserHistory}>
                    <Route path="/" component={MainPage}/>
                    <Route path="/addmovie" component={AddMovie}/>
                    <Route path="/listmovies" component={AllMovies}/>
                    <Route path="/searchmovies" component={SearchMovies}/>
                </Router>
            </MuiThemeProvider>
        );
    }
}

