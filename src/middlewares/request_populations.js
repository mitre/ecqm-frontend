import {
  FETCH_INITIAL_PATIENT_POPULATION_FULFILLED,
  FETCH_NUMERATOR_POPULATION_FULFILLED,
  FETCH_DENOMINATOR_POPULATION_FULFILLED,
  FETCH_OUTLIER_POPULATION_FULFILLED,
  FETCH_INITIAL_PATIENT_POPULATION_RESOLVED,
  FETCH_NUMERATOR_POPULATION_RESOLVED,
  FETCH_DENOMINATOR_POPULATION_RESOLVED,
  FETCH_OUTLIER_POPULATION_RESOLVED
} from '../actions/types';

function restructurePopulations(populations) {
  return {
    patients: populations[0].patients,
    qualityReportId: populations[1].qualityReportId,
    populationQuery: populations[0].populationQuery,
    total: populations[0].total
  };
}

export default function({ dispatch }) {
  return next => action => {
    switch (action.type) {
      case FETCH_INITIAL_PATIENT_POPULATION_FULFILLED:
        dispatch({
          type: FETCH_INITIAL_PATIENT_POPULATION_RESOLVED,
          payload: restructurePopulations(action.payload)
        });
        return;
      case FETCH_NUMERATOR_POPULATION_FULFILLED:
        dispatch({
          type: FETCH_NUMERATOR_POPULATION_RESOLVED,
          payload: restructurePopulations(action.payload)
        });
        return;
      case FETCH_DENOMINATOR_POPULATION_FULFILLED:
        dispatch({
          type: FETCH_DENOMINATOR_POPULATION_RESOLVED,
          payload: restructurePopulations(action.payload)
        });
        return;
      case FETCH_OUTLIER_POPULATION_FULFILLED:
        dispatch({
          type: FETCH_OUTLIER_POPULATION_RESOLVED,
          payload: restructurePopulations(action.payload)
        });
        return;
    }

    return next(action);
  };
}
