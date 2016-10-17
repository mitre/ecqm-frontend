import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import measureReducer from './measure';
import patientReducer from './patient';
import populationReducer from './population';
import qualityReportReducer from './quality_report';

const rootReducer = combineReducers({
  routing: routerReducer,
  measure: measureReducer,
  patient: patientReducer,
  population: populationReducer,
  qualityReport: qualityReportReducer
});

export default rootReducer;
