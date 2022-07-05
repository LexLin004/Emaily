export const FETCH_USER = 'fetch_user'; // action type
export const FETCH_SURVEYS = 'fetch_surveys'; // action type
/** So we're going to create an action creator that will make our network request the backend.
 * It will get the list of surveys, it will dispatch an action of type FETCH_SURVEYS.
 * And then it will be up to to us to create a new reducer to catch the data that is being captured by the request.
 */