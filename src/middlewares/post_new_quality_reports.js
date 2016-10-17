import axios from 'axios';

import {
  FETCH_NEW_QUALITY_REPORT,
  POST_NEW_QUALITY_REPORT
} from '../actions/types';

const postNewQualityReportRequests = store => next => action => {
  if (action.type === FETCH_NEW_QUALITY_REPORT) {
    let measure = action.payload;

    measure.subMeasures.forEach((subMeasure) => {
      let fd;

      if (typeof(FormData) === 'undefined') {
        fd = {};
        fd.append = (key, value) => { fd[key] = value; };
      } else {
        fd = new FormData();
      }

      fd.append('measureId', measure.hqmfId);

      // TODO: Remove hard coded effectiveDate and allow it to be updated by the user interface
      fd.append('effectiveDate', Date.parse("01-Jan-2015 00:00:00")/1000);
      if (subMeasure.subId) {
        fd.append('subId', subMeasure.subId);
      }

      store.dispatch({
        type: POST_NEW_QUALITY_REPORT,
        payload: new Promise((resolve) => {
          axios.post('/QualityReport', fd, { withCredentials: true })
               .then(response => resolve(response.data));
        })
      });
    });
  }

  return next(action);
};

export default postNewQualityReportRequests;
