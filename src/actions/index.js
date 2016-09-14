import axios from 'axios';

import {
  REQUEST_MEASURES,
  REQUEST_USER_INFO,
  REQUEST_PATIENT_COUNT
} from './types';

export function retrieve(url, context=null) {
  return new Promise((resolve) =>
    axios.get(url, {withCredentials: true})
      .then(response => {
        if (context) {
          return resolve([response.data, context]);
        } else {
          return resolve(response.data);
        }
       }));
}

export function fetchMeasures() {
  return {type: REQUEST_MEASURES,
          payload: retrieve("/Measure")};
}

export function fetchUserInfo() {
  return {type: REQUEST_USER_INFO,
          payload: retrieve('/UserInfo')};
}

export function fetchPatientCount() {
  return {type: REQUEST_PATIENT_COUNT,
          payload: retrieve("/Patient")};
}
