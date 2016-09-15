import {
  REQUEST_POPULATION_FULFILLED
} from '../actions/types';

import immutable from 'immutable';

const PATIENTS_PER_PAGE = 20;

export function populations(state = {}, action) {
  switch (action.type) {
    case REQUEST_POPULATION_FULFILLED:
      let pops = immutable.Map(state);
      let qrProps = {};
      let response = action.payload[0];
      if (! pops.has(action.payload[1].qualityReportId)) {
        qrProps[action.payload[1].population] = [{page: 0, patients: response.patients}];
      } else {
        qrProps = pops.get(action.payload[1].qualityReportId);
        let individualPop = qrProps[action.payload[1].population];
        const pageNumber = response.populationQuery.offset / PATIENTS_PER_PAGE;
        if (individualPop) {
          qrProps[action.payload[1].population].push({page: pageNumber, patients: response.patients});
        } else {
          qrProps[action.payload[1].population] = [{page: pageNumber, patients: response.patients}];
        }
      }
      qrProps[action.payload[1].population + 'Total'] = response.total;

      pops = pops.set(action.payload[1].qualityReportId, qrProps);

      return pops.toObject();
    default:
      return state;
  }
}
