import {
  FETCH_PATIENT_COUNT_FULFILLED,
  FETCH_USER_INFO_FULFILLED
} from '../actions/types';

export default function(state = { patientCount: 0 , user: {} }, action) {
  switch (action.type) {
    case FETCH_PATIENT_COUNT_FULFILLED:
      return { ...state, patientCount: action.payload.total };
    case FETCH_USER_INFO_FULFILLED:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
