// the reducer sole purpose is going to be to watch for this type FETCH_SURVEYS and return the list of surveys.
import { FETCH_SURVEYS } from "../actions/types";

export default function (state = [] /**by default, this reducer will return an empty array. */, action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload;
        default:
            return state;
    }
}