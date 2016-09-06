import {
  SELECT_MEASURE
} from './types';

export function selectMeasure(desiredMeasure) {
  return {type: SELECT_MEASURE, measure: desiredMeasure};
}
