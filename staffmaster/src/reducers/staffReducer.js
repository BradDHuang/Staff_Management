
import { GET_STAFF, ADD_STAFF, DELETE_STAFF, STAFF_LOADING } from "../actions/types";

const initialState = {
    members: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_STAFF:
            return {
                ...state,
                members: action.payload,
                loading: false
            };
            
        case DELETE_STAFF:
            return {
                ...state,
                members: state.members.filter(member => member._id !== action.payload)
            };
            
        case ADD_STAFF:
            return {
                ...state,
                members: [action.payload, ...state.members]
            };
        
        case STAFF_LOADING:
            return {
                ...state,
                loading: true
            };
        
        default:
            return state;
    }
}



