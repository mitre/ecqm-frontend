import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import immutable from 'immutable';
import { flattenMeasures, flattenCategories} from './measures';

import { REQUEST_MEASURES, RECEIVE_MEASURES } from '../actions/index';
import { SELECT_MEASURE } from '../actions/selectedMeasures';
import { REQUEST_NEW_QUALITY_REPORT, POLL_QUALITY_REPORT,
         RECEIVE_QUALITY_REPORT } from '../actions/qualityReports';


function definitions(state = {
  isFetching: false,
  measures: [], categories: []
}, action) {
  switch (action.type) {
    case REQUEST_MEASURES:
      return {
        isFetching: true,
        measures: [],
        categories: []
      };
    case RECEIVE_MEASURES:
      return {
        isFetching: false,
        measures: flattenMeasures(action.payload),
        categories: flattenCategories(action.payload)
      };
    default:
      return state;
  }
}

function qualityReports(state = [], action) {
  var qrs = immutable.List.of(...state);
  switch (action.type) {
    case REQUEST_NEW_QUALITY_REPORT:
      qrs = qrs.push({measureId: action.measureId,
                      subId: action.subId,
                      status: {state: 'Requesting', log: []}});
      return qrs.toArray();
    case POLL_QUALITY_REPORT:
    case RECEIVE_QUALITY_REPORT:
      return qrs.update((origQrs) => {
        return origQrs.map((qr) => {
          if (qr.measureId === action.payload.measureId && qr.subId === action.payload.subId) {
            return action.payload;
          } else {
            return qr;
          }
        });
      });
    default:
      return state;
  }
}

function selectedMeasures(state = [], action) {
  switch (action.type) {
    case SELECT_MEASURE:
      var sms = immutable.List.of(...state);
      sms = sms.push(action.measure);
      return sms.toArray();
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  qualityReports,
  definitions,
  selectedMeasures,
  routing: routeReducer
});

export default rootReducer;
