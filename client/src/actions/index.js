import axios from 'axios';
import { FETCH_USER, FETCH_SURVEYS } from './types';

// 86
// fetch user action creator
// origin
// export const fetchUser = () => {
//     return function (dispatch) {
//         axios
//         .get('/api/current_user')
//         .then(res => dispatch({ type: FETCH_USER, payload: res })); // we want to dispatch an action after this request has been successfully completed.
//     };
   

//     /** usual
//      * const request = axios.get('/api/current_user');
//      * return {
//      *  type: FETCH_USER,
//      *  payload: request
//      * };
//      */

// };

// refactor
export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch({ type: FETCH_USER, payload: res.data }); // we want to dispatch an action after this request has been successfully completed.
};

// want to communicate something to the back end API, we are always going to make that request inside of an action creator.
export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    history.push('/surveys'); // go back to the dashboard after Successfully send the email
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchSurveys = () => async dispatch => {
    // logic to actually fetch all the surveys from back end
    const res = await axios.get('/api/surveys');
    // payload will be in array that contains all the different surveys that our current user has made.
    dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

