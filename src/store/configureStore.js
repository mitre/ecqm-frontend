import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import DevTools from '../containers/DevTools';

import checkQualityReportResponse from '../middlewares/check_qr_response';
import postNewQualityReportRequests from '../middlewares/post_new_quality_reports';
import requestMeasuresMiddleware from '../middlewares/request_measures';
import requestPopulationsMiddleware from '../middlewares/request_populations';
import rootReducer from '../reducers';

const POLLING_INTERVAL = 2000; // two seconds

export default function configureStore(initialState) {
  let middleware = applyMiddleware(
    promiseMiddleware(),
    createLogger(),
    checkQualityReportResponse(POLLING_INTERVAL),
    postNewQualityReportRequests,
    requestMeasuresMiddleware,
    requestPopulationsMiddleware
  );

  let enhancer = compose(middleware, DevTools.instrument());
  let store = createStore(rootReducer, initialState, enhancer);

  return store;
}
