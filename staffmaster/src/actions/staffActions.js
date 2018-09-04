
import { FETCH_STAFF_REQUEST, FETCH_STAFF_SUCCESS, FETCH_STAFF_FAIL, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_FAIL } from "./types";
import axios from "axios";
import qs from "qs";

export const getStaffLoading = () => ({
    type: FETCH_STAFF_REQUEST,
});
export const getStaffSuccess = (res) => ({
    type: FETCH_STAFF_SUCCESS,
    staff: res
});
export const getStaffFail= (err) => ({
    type: FETCH_STAFF_FAIL,
    err
});

export const getDetailLoading = () => {
  return {
    type: FETCH_DETAIL_REQUEST
  };
};
export const getDetailSuccess = (res) => {
  return {
    type: FETCH_DETAIL_SUCCESS,
    detail: res,
    manager: res.manager,
    directReports: res.directReports
  };
};
export const getDetailFail = (err) => {
  return {
    type: FETCH_DETAIL_FAIL,
    err
  };
};

export const getStaff = () => dispatch => {
    dispatch(getStaffLoading());
    axios({method: "get", url: "https://personnel-management-happitt.c9users.io:8081/api/staff"})
        .then(res => {
            dispatch(getStaffSuccess(res.data.staff));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        });
};

export const addStaff = (staff) => dispatch => {
    axios({
        method: "post", 
        url: "https://personnel-management-happitt.c9users.io:8081/api/staff",
        data: qs.stringify(staff)
    })
        .then(res => {
            dispatch(getStaffSuccess(res.data.staff));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        });
};

export const deleteStaff = (id) => dispatch => {
    axios({
        method: "delete", 
        url: `https://personnel-management-happitt.c9users.io:8081/api/staff/${id}`,
    })
        .then(res => {
            dispatch(getStaffSuccess(res.data.staff));
        })
        .catch(err => {
            dispatch(getStaffFail(err));
        });
};

export const getStaffDetail = (id) => dispatch => {
    dispatch(getDetailLoading());
    axios
      .get(`https://personnel-management-happitt.c9users.io:8081/api/staff/${id}`)
      .then(res => {
        dispatch(getDetailSuccess(res.data));
      })
      .catch(err => {
        dispatch(getDetailFail(err));
      });
};

export const editStaff = (id, member) => dispatch => {
    axios
      .put(`https://personnel-management-happitt.c9users.io:8081/api/staff/${id}`, member)
      .then(res => {
          dispatch(getStaffSuccess(res.data.staff));
      })
      .catch(err => {
          dispatch(getStaffFail(err));
      });
};





