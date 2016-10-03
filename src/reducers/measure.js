import _ from 'lodash';

import {
  FETCH_MEASURES_RESOLVED,
  SELECT_MEASURE,
  UNSELECT_MEASURE
} from '../actions/types';

export default function(state = { measures: [],
                                  selectedMeasures: [],
                                  categories: [] }, action) {
  switch (action.type) {
    case FETCH_MEASURES_RESOLVED:
      return { ...state, measures: action.payload.measures,
                         categories: action.payload.categories };
    case SELECT_MEASURE:
      let newSelectedMeasures = _.uniq(_.concat(state.selectedMeasures, action.payload));
      return { ...state, selectedMeasures: newSelectedMeasures };
    case UNSELECT_MEASURE:
      let newSelectedMeas = _.pull(state.selectedMeasures.slice(), action.payload);
      return { ...state, selectedMeasures: newSelectedMeas };
    default:
      return state;
  }
}
