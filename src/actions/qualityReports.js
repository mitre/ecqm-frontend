import {
  REQUEST_NEW_QUALITY_REPORT
} from './types';

export function findQualityReport(state, hqmfId, subId) {
  const qrs = state.qualityReports;
  return qrs.find((qr) => qr.measureId === hqmfId && qr.subId === subId);
}

export function requestNewQualityReport(measure) {
  return {type: REQUEST_NEW_QUALITY_REPORT,
          measure: measure};
}
