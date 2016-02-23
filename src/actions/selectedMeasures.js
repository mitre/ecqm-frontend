export const SELECT_MEASURE = 'SELECT_MEASURE';
export const DESELECT_MEASURE = 'DESELECT_MEASURE';

export function selectMeasure(desiredMeasure) {
  return (dispatch, getState) => {
    const selectedMeasures = getState().selectedMeasures;
    if (selectedMeasures.find((sm) => sm.hqmfId === desiredMeasure.hqmfId) === undefined) {
      dispatch({type: SELECT_MEASURE, measure: desiredMeasure});
    }
  };
}
