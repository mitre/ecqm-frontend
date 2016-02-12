import fetch from 'isomorphic-fetch'

export const REQUEST_MEASURES = 'REQUEST_MEASURES'
export const RECEIVE_MEASURES = 'RECEIVE_MEASURES'

function requestMeasures() {
  return {
    type: REQUEST_MEASURES
  };
}

function receiveMeasures(json) {
  return {
    type: RECEIVE_MEASURES,
    measures: json
  };
}

function fetchMeasures() {
  return dispatch => {
    dispatch(requestMeasures())
    return fetch(`http://localhost:3001/Measure`)
      .then(req => req.json())
      .then(json => dispatch(receiveMeasures(json)))
  }
}

function shouldFetchMeasures(state) {
  const measures = state.measures;
  if (measures.measures.length == 0 && ! measures.isFetching) {
    return true;
  } else {
    return false;
  }
}

export function fetchMeasuresIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMeasures(getState())) {
      return dispatch(fetchMeasures());
    }
  };
}
