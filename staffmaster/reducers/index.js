
import {combineReducers} from 'redux';
import staffReducer from './staffReducer';

const reducers = combineReducers({
  staff: staffReducer,
});

export default reducers;



