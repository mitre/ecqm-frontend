import immutable from 'immutable';

import {
  FETCH_NEW_QUALITY_REPORT,
  FETCH_QUALITY_REPORT_FULFILLED,
  POST_NEW_QUALITY_REPORT_FULFILLED
} from '../actions/types';

export default function (state = { qualityReports: [] }, action) {
  let qrs = immutable.List.of(...state.qualityReports);

  switch (action.type) {
    case FETCH_NEW_QUALITY_REPORT:
      action.payload.subMeasures.forEach((submeasure) => {
        qrs = qrs.push({ measureId: action.payload.hqmfId,
                         subId: submeasure.subId,
                         status: { state: 'Requesting', log: [] } });
      });
      return { ...state, qualityReports: qrs.toArray() };
    case FETCH_QUALITY_REPORT_FULFILLED:
      qrs = qrs.push(action.payload);
      return { ...state, qualityReports: qrs.toArray() };
    case POST_NEW_QUALITY_REPORT_FULFILLED:
      qrs = qrs.update((origQrs) => {
        return origQrs.map((qr) => {
          if (qr.measureId === action.payload.measureId && qr.subId === action.payload.subId) {
            return action.payload;
          } else {
            return qr;
          }
        });
      });

      return { ...state, qualityReports: qrs.toArray() };
    default:
      return state;
  }
}
