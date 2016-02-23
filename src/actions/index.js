import fetch from 'isomorphic-fetch';

export const REQUEST_MEASURES = 'REQUEST_MEASURES';
export const RECEIVE_MEASURES = 'RECEIVE_MEASURES';

export function receiveResponse(eventType, json) {
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

export function fetchMeasuresIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchMeasures(getState())) {
      dispatch({type: REQUEST_MEASURES});
      return dispatch(retrieve(RECEIVE_MEASURES, 'http://localhost:3001/Measure'));
    }
  };
}
