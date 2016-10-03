import { retrieve } from './index';

import {
  FETCH_MEASURES,
  SELECT_MEASURE,
  UNSELECT_MEASURE
} from './types';

export function fetchMeasures() {
  return {
    type: FETCH_MEASURES,
    payload: retrieve("/Measure")
  };
}

export function selectMeasure(measure) {
  return {
    type: SELECT_MEASURE,
    payload: measure
  };
}

export function unselectMeasure(measure) {
  return {
    type: UNSELECT_MEASURE,
    payload: measure
  };
}
