import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';

import {
  REQUEST_MEASURES, RECEIVE_MEASURES
} from '../actions/index';

function measures(state = {
  isFetching: false,
  measures: []
}, action) {
  switch (action.type) {
    case REQUEST_MEASURES:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_MEASURES:
      return Object.assign({}, state, {
        isFetching: false,
        measures: action.measures
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  measures: measures,
  routing: routeReducer
});

export default rootReducer;
