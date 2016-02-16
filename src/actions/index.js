import fetch from 'isomorphic-fetch';

export const REQUEST_MEASURES = 'REQUEST_MEASURES';
export const RECEIVE_MEASURES = 'RECEIVE_MEASURES';
export const REQUEST_QUALITY_REPORT = 'REQUEST_QUALITY_REPORT';
export const RECEIVE_QUALITY_REPORT = 'RECEIVE_QUALITY_REPORT';

function receiveResponse(eventType, json) {
  return {
    type: eventType,
    payload: json
  };
}

function retrieve(event, url) {
  return dispatch => {
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch(receiveResponse(event, json)));
  };
}

function shouldFetchMeasures(state) {
  const definitions = state.definitions;
  if (definitions.measures.length === 0 && ! definitions.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function findQualityReport(state, hqmfId) {
  const qrs = state.qualityReports;
  return qrs.find((qr) => {return qr.hqmfId === hqmfId;});
}

function shouldFetchQualityReport(state, hqmfId) {
  const qr = findQualityReport(state, hqmfId);
  if (qr === undefined || qr.status !== 'completed' ) {
    return true;
  } else {
    return false;
  }
}

export function fetchQualityReportIfNeeded(measure) {
  return (dispatch, getState) => {
    if (shouldFetchQualityReport(getState(), measure.hqmfId)) {
      dispatch({type: REQUEST_QUALITY_REPORT, measure: measure});
      return dispatch(retrieve(RECEIVE_QUALITY_REPORT, `http://localhost:3001/QualityReport/${measure.hqmfId}`));
    }
  };
}

export function fetchMeasuresIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMeasures(getState())) {
      dispatch({type: REQUEST_MEASURES});
      return dispatch(retrieve(RECEIVE_MEASURES, 'http://localhost:3001/Measure'));
    }
  };
}
