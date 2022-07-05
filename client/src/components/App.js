import React, { Component } from "react";
/** BrowserRouter:
 * the brains of react router. It's the thing that tells react How to behave
 * It's the thing that looks at the current URL and then changes the set of components that
 * are visible on the screen at any given time.
 */
/** Route:
 * a react component that is used to set up a rule between a certain route
 * that the user might visit inside of an application and
 * a set of components that will be actually visible on the screen.
 */
import {BrowserRouter, Route} from "react-router-dom";
import { connect } from "react-redux";
import * as actions from '../actions';

import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./surveys/SurveyNew";

/**
 * BrowerRouter take at most one child
 */
/**
 * const App = () => { // a functional component
    return (
        <div className="container">
            <BrowserRouter> 
                <div>
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route exact path="/surveys/new" component={SurveyNew} />
                </div>
            </BrowserRouter>
        </div>
    );
};

 */

// refactor App as class
class App extends Component {
    /** lifecycle method that we will use to fetch the current user.
     * the instant this component has been mounted or rendered onto the screen.
     * Go in attempt to fetch the current user or figure out whether or not our current user is actually signed in.
    */
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter> 
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route exact path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

/** The first argument is reserved for the map state to props arguments or the map state props function
 * 2nd, pass all the different action creators that we want to wire up.
 */
export default connect(null, actions)(App);