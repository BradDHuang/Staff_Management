
import { FETCH_STAFF_REQUEST, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAIL } from "../actions/types";

const initialState = {
    staff: [],
    loading: false,
    err: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_STAFF_REQUEST:
            return {
                ...state,
                loading: true
            };
            
        case FETCH_STAFF_SUCCESS:
            return {
                ...state,
                staff: action.staff,
                loading: false,
                err: ""
            };
            
        case FETCH_STAFF_FAIL:
            return {
                ...state,
                loading: false,
                err: action.err
            };
        
        default:
            return state;
    }
}



