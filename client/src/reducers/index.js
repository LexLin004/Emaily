/** import the authReducer into here.
 * combine it with a combined reducers call, thanks to the Redux Library,
 * and then immediately export it from this file.
*/
import { combineReducers } from "redux";
import { reducer as reduxForm } from 'redux-form';
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";

/** {} <- this object we are passing in, Whatever keys we provide to this object
 * are going to represent the keys that exist inside of our state object*/
export default combineReducers({
    auth: authReducer, // the auth piece of state is being manufactured or produced by the auth reducer
    form: reduxForm,
    surveys: surveysReducer
});
