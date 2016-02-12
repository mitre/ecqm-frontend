import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routeReducer
});

export default rootReducer;
