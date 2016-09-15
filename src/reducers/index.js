import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import immutable from 'immutable';
import { flattenMeasures, flattenCategories} from './measures';
import { populations } from './populations';

import {
  REQUEST_MEASURES_FULFILLED,
  REQUEST_USER_INFO_FULFILLED,
  SELECT_MEASURE,
  REQUEST_NEW_QUALITY_REPORT,
  POST_NEW_QUALITY_REPORT_FULFILLED,
  REQUEST_PATIENT_COUNT_FULFILLED,
  REQUEST_QUALITY_REPORT_FULFILLED
} from '../actions/types';

function definitions(state = {isFetching: false, measures: [], categories: []},
                     action) {
  switch (action.type) {
    case REQUEST_MEASURES_FULFILLED:
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
      action.measure.subMeasures.forEach((sm) => {
        qrs = qrs.push({measureId: action.measure.hqmfId,
                        subId: sm.subId,
                        status: {state: 'Requesting', log: []}});
      });
      return qrs.toArray();
    case REQUEST_QUALITY_REPORT_FULFILLED:
      qrs = qrs.push(action.payload);
      return qrs.toArray();
    case POST_NEW_QUALITY_REPORT_FULFILLED:
      return qrs.update((origQrs) => {
        return origQrs.map((qr) => {
          if (qr.measureId === action.payload.measureId && qr.subId === action.payload.subId) {
            return action.payload;
          } else {
            return qr;
          }
        });
      }).toArray();
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

function user(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER_INFO_FULFILLED:
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}

function patientCount(state = 0, action) {
  switch (action.type) {
    case REQUEST_PATIENT_COUNT_FULFILLED:
      return action.payload.total;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  qualityReports,
  definitions,
  selectedMeasures,
  user,
  populations,
  patientCount,
  routing: routeReducer
});

export default rootReducer;
