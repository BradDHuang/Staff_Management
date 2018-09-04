
import { FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS, FETCH_DETAIL_FAIL } from "../actions/types";

const detail = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DETAIL_REQUEST:
      return {
        loading: true
      };

    case FETCH_DETAIL_SUCCESS:
      return {
        loading: false,
        err: "",
        detail: action.detail.staff,
        manager: action.manager.length === 1 ? action.manager[0] : null,
        directReports: action.directReports
      };

    case FETCH_DETAIL_FAIL:
      return {
        loading: false,
        err: action.err
      };

    default:
      return state;
  }
};

export default detail;

