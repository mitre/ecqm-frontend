import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import immutable from 'immutable';

import {
  REQUEST_MEASURES, RECEIVE_MEASURES, REQUEST_QUALITY_REPORT, RECEIVE_QUALITY_REPORT
} from '../actions/index';

function definitions(state = {
  isFetching: false,
  measures: []
}, action) {
  switch (action.type) {
    case REQUEST_MEASURES:
      return {
        isFetching: true,
        measures: []
      };
    case RECEIVE_MEASURES:
      return {
        isFetching: false,
        measures: action.payload
      };
    default:
      return state;
  }
}

function qualityReports(state = [], action) {
  var qrs = immutable.List.of(...state);
  switch (action.type) {
    case REQUEST_QUALITY_REPORT:
      qrs = qrs.push({hqmfId: action.measure.hqmfId, status: 'Loading'});
      return qrs.toArray();
    case RECEIVE_QUALITY_REPORT:
      qrs = qrs.push(action.payload);
      return qrs.toArray();
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  qualityReports,
  definitions,
  routing: routeReducer
});

export default rootReducer;
