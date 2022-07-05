import React, { Component } from "react";

/**
 * make sure that this header is also aware of whether or not the users logged in by hooking up the header component to our Redux store.
 * So we want to hook this thing up to the store and we want to pull out the auth piece of state that tells us if the user is or isn't logged in
 * We always import the Connect Helper from React Redux. 
 * We define the map state props function and then we pull off the little pieces of state that we actually care about inside this component.
 */
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google">Login With Google</a></li>
                );
            default:
                return [
                    <li key="1"><Payments /></li>, 
                    <li key="2" style={ {margin: '0 10px' } }>
                        Credits: {this.props.auth.credits} 
                    </li>,
                    <li key="3"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo"
                        style={ {margin: '0 10px' } }
                    >
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    }
}

/** gets called with the entire state object out of the Redux store.
 */ 
function mapStateToProps({ auth }) {
    return {
        auth // from ./reducers/index.js
    };
}

export default connect(mapStateToProps)(Header);