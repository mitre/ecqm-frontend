import { retrieve } from './index';

import {
  FETCH_PATIENT_COUNT,
  FETCH_USER_INFO
} from './types';

export function fetchPatientCount() {
  return {
    type: FETCH_PATIENT_COUNT,
    payload: retrieve('/Patient')
  };
}

export function fetchUserInfo() {
  return {
    type: FETCH_USER_INFO,
    payload: retrieve('/UserInfo')
  };
}
