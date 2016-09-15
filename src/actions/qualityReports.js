import {
  REQUEST_NEW_QUALITY_REPORT,
  REQUEST_POPULATION,
  REQUEST_QUALITY_REPORT
} from './types';

import { retrieve } from './index';

export function findQualityReport(state, hqmfId, subId) {
  const qrs = state.qualityReports;
  return qrs.find((qr) => qr.measureId === hqmfId && qr.subId === subId);
}

export function requestNewQualityReport(measure) {
  return {type: REQUEST_NEW_QUALITY_REPORT,
          measure: measure};
}

export function requestQualityReport(qualityReportId) {
  return {type: REQUEST_QUALITY_REPORT,
          payload: retrieve(`/QualityReport/${qualityReportId}`)};
}

export function requestPopulation(qualityReportId, population, offset=0) {
  return {type: REQUEST_POPULATION,
          payload: retrieve(`/QualityReport/${qualityReportId}/PatientResults?population=${population}&limit=20&offset=${offset}`,
                            {qualityReportId, population})};
}
