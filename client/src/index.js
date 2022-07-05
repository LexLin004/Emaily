/** use of webpack https://webpack.js.org/ */
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';

/** Development only axios helpers! */
import axios from 'axios';
window.axios = axios;

/** action creators are where we somehow initiate change inside of the redux side of our application. */


/** use the crate store helper to create a new instance of our Redock store.
 * 1st argument to create store is all the different reducers that we have inside of our application.
 * 2nd: the starting or initial state of my application.
*/
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/** Takes two arguments.
 * The first argument is our route components,
 * second is where we are attempting to render that component to inside of our Dom.
 */
/** args:
 * (a component instance (notice the </>),
 * provide a reference to an existing DOM node inside of our HTML document
 * which is the root div in the ./public/index.html
 */
/** 
 * Provider tag: react component that knows how to read changes from our Redux store.
 * Any time the Redux store gets some new state produced inside of it,
 * the provider will inform all of its children components.
 * So essentially everything that the App renders that some new state is available and it will update all
 * of those different components with the new state.
 */
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);

/** Redux Lib 
 * Redux Library is all about holding all the states or all the data inside of our application
 * seee diagram 04/007,013,009
 */

/**  Redux Store
 *      combineReducers
 *          authReducer (Records whether or not the user is logged in)
 *          surveysReducer (Records a list of all surveys user has created)
*/

console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
console.log('Env is ', process.env.NODE_ENV);
