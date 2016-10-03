import { retrieve } from './index';

import {
  FETCH_INITIAL_PATIENT_POPULATION,
  FETCH_NUMERATOR_POPULATION,
  FETCH_DENOMINATOR_POPULATION,
  FETCH_OUTLIER_POPULATION
} from './types';

export function fetchInitialPatientPopulation(qualityReportId, offset=0, limit=20) {
  let url = `/QualityReport/${qualityReportId}/PatientResults?population=initialPatientPopulation&limit=${limit}&offset=${offset}`;

  return {
    type: FETCH_INITIAL_PATIENT_POPULATION,
    payload: retrieve(url, { qualityReportId })
  };
}

export function fetchNumeratorPopulation(qualityReportId, offset=0, limit=20) {
  let url = `/QualityReport/${qualityReportId}/PatientResults?population=numerator&limit=${limit}&offset=${offset}`;

  return {
    type: FETCH_NUMERATOR_POPULATION,
    payload: retrieve(url, { qualityReportId })
  };
}

export function fetchDenominatorPopulation(qualityReportId, offset=0, limit=20) {
  let url = `/QualityReport/${qualityReportId}/PatientResults?population=denominator&limit=${limit}&offset=${offset}`;

  return {
    type: FETCH_DENOMINATOR_POPULATION,
    payload: retrieve(url, { qualityReportId })
  };
}

export function fetchOutlierPopulation(qualityReportId, offset=0, limit=20) {
  let url = `/QualityReport/${qualityReportId}/PatientResults?population=outlier&limit=${limit}&offset=${offset}`;

  return {
    type: FETCH_OUTLIER_POPULATION,
    payload: retrieve(url, { qualityReportId })
  };
}
