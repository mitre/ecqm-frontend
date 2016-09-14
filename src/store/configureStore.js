import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import checkQualityReportResponse from '../middlewares/check_qr_response';
import postNewQualityReportRequests from '../middlewares/post_new_quality_reports';

const POLLING_INTERVAL = 2000; // two seconds

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(promiseMiddleware(), createLogger(),
        checkQualityReportResponse(POLLING_INTERVAL), postNewQualityReportRequests),
      DevTools.instrument()
    )
  );

  return store;
}
