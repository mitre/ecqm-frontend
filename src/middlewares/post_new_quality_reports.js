import fetch from 'isomorphic-fetch';

import {
  REQUEST_NEW_QUALITY_REPORT,
  POST_NEW_QUALITY_REPORT
} from '../actions/types';

const postNewQualityReportRequests = store => next => action => {
  if (action.type === REQUEST_NEW_QUALITY_REPORT) {
    const measure = action.measure;
    measure.subMeasures.forEach((sm) => {
      var fd = new FormData();
      fd.append('measureId', measure.hqmfId);
      // TODO: Remove hard coded effectiveDate and allow it to be updated by the
      // user interface
      fd.append('effectiveDate', Date.parse("01-Jan-2015 00:00:00")/1000);
      if (sm.subId) {
        fd.append('subId', sm.subId);
      }
      store.dispatch({type: POST_NEW_QUALITY_REPORT,
        payload: new Promise((resolve) => {
          fetch('/QualityReport', {method: 'post', body: fd, credentials: 'same-origin'})
            .then(res => res.json())
            .then(json => resolve(json));
        })});
    });
  }

  return next(action);
};

export default postNewQualityReportRequests;
