import React, {Component} from 'react';
import {MainPage, MovieInfo} from '../pages';
import {Route, BrowserRouter as Router} from 'react-router-dom';

class App extends Component{

    render() {

        return (
                <div className="app">
                    <Router>
                        <Route path = '/' exact component={MainPage}/>
                        <Route path='/movie/:id' exact render = {props => <MovieInfo {...props}/> }/>

                    </Router>
                </div>

        )
    }


};

export default App;