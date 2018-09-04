
import { GET_STAFF, ADD_STAFF, DELETE_STAFF, STAFF_LOADING } from "./types";
import axios from "axios";
import qs from "qs";

export const getStaff = () => dispatch => {
    dispatch(setStaffLoading());
    axios({method: "get", url: "https://personnel-management-happitt.c9users.io:8081/api/staff"})
        .then(res => 
            dispatch({
                type: GET_STAFF,
                payload: res.data,
            })
        );
};

export const addStaff = (staff) => dispatch => {
    axios({
        method: "post", 
        url: "https://personnel-management-happitt.c9users.io:8081/api/staff",
        data: qs.stringify(staff)
    })
        .then(res => 
            dispatch({
                type: ADD_STAFF,
                payload: res.data,
            })
        );
};

export const deleteStaff = (id) => dispatch => {
    axios({
        method: "delete", 
        url: `https://personnel-management-happitt.c9users.io:8081/api/staff/${id}`,
    })
        .then(res => 
            dispatch({
                type: DELETE_STAFF,
                payload: id,
            })
        );
};

export const setStaffLoading = () => ({
    type: STAFF_LOADING,
});



