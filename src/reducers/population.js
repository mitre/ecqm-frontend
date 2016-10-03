import {
  FETCH_INITIAL_PATIENT_POPULATION_RESOLVED,
  FETCH_NUMERATOR_POPULATION_RESOLVED,
  FETCH_DENOMINATOR_POPULATION_RESOLVED,
  FETCH_OUTLIER_POPULATION_RESOLVED
} from '../actions/types';

export default function (state = { initialPatientPopulation: {},
                                   numeratorPopulation: {},
                                   denominatorPopulation: {},
                                   outlierPopulation: {} }, action) {
  switch (action.type) {
    case FETCH_INITIAL_PATIENT_POPULATION_RESOLVED:
      return { ...state, initialPatientPopulation: action.payload };
    case FETCH_NUMERATOR_POPULATION_RESOLVED:
      return { ...state, numeratorPopulation: action.payload };
    case FETCH_DENOMINATOR_POPULATION_RESOLVED:
      return { ...state, denominatorPopulation: action.payload };
    case FETCH_OUTLIER_POPULATION_RESOLVED:
      return { ...state, outlierPopulation: action.payload };
    default:
      return state;
  }
}
