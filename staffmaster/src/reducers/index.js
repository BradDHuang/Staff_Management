
import {combineReducers} from 'redux';
import staffReducer from './staffReducer';
import detailReducer from "./detailReducer.js";

const reducers = combineReducers({
  staff: staffReducer,
  detail: detailReducer
});

export default reducers;



