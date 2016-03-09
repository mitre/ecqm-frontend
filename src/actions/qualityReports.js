import fetch from 'isomorphic-fetch';
import { receiveResponse } from './index';

export const REQUEST_NEW_QUALITY_REPORT = 'REQUEST_NEW_QUALITY_REPORT';
export const POLL_QUALITY_REPORT = 'POLL_QUALITY_REPORT';
export const RECEIVE_QUALITY_REPORT = 'RECEIVE_QUALITY_REPORT';
const TWO_SECONDS = 2000;

export function findQualityReport(state, hqmfId, subId) {
  const qrs = state.qualityReports;
  return qrs.find((qr) => qr.measureId === hqmfId && qr.subId === subId);
}

function pollQualityReport(dispatch, qualityReport) {
  window.setTimeout(() => {
  fetch(`/QualityReport/${qualityReport.id}`, {credentials: 'same-origin'})
    .then(res => res.json())
    .then(json => checkQualityReportResponse(dispatch, json));
  }, TWO_SECONDS);
}

function checkQualityReportResponse(dispatch, json) {
  if (json.status.state === 'completed') {
    dispatch(receiveResponse(RECEIVE_QUALITY_REPORT, json));
  } else {
    dispatch(receiveResponse(POLL_QUALITY_REPORT, json));
    pollQualityReport(dispatch, json);
  }
}

export function requestNewQualityReport(measure) {
  return (dispatch) => {
    measure.subMeasures.forEach((sm) => {
      dispatch({type: REQUEST_NEW_QUALITY_REPORT, measureId: measure.hqmfId,
                subId: sm.subId});
      var fd = new FormData();
      fd.append('measureId', measure.hqmfId);
      // TODO: Remove hard coded effectiveDate and allow it to be updated by the
      // user interface
      fd.append('effectiveDate', Date.parse("01-Jan-2015 00:00:00")/1000);
      if (sm.subId) {
        fd.append('subId', sm.subId);
      }
      fetch('/QualityReport', {method: 'post', body: fd, credentials: 'same-origin'})
        .then(res => res.json())
        .then(json => {
          checkQualityReportResponse(dispatch, json);
        });
    });
  };
}
