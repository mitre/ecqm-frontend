import { retrieve } from './index';

import {
  FETCH_NEW_QUALITY_REPORT,
  FETCH_QUALITY_REPORT
} from './types';

export function fetchNewQualityReport(measure) {
  return {
    type: FETCH_NEW_QUALITY_REPORT,
    payload: measure
  };
}

export function fetchQualityReport(qualityReportId) {
  return {
    type: FETCH_QUALITY_REPORT,
    payload: retrieve(`/QualityReport/${qualityReportId}`)
  };
}
