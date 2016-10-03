import { retrieve } from '../actions';

import {
  POST_NEW_QUALITY_REPORT_FULFILLED,
  POST_NEW_QUALITY_REPORT
} from '../actions/types';

const checkQualityReportResponse = timeout => store => next => action => {
  if (action.type === POST_NEW_QUALITY_REPORT_FULFILLED) {
    if (action.payload.status.state === 'completed') {
      return next(action);
    } else {
      setTimeout(() => {
        store.dispatch({
          type: POST_NEW_QUALITY_REPORT,
          payload: retrieve(`/QualityReport/${action.payload.id}`)
        });
      }, timeout);
    }
  } else {
    return next(action);
  }
};

export default checkQualityReportResponse;
