import fetch from 'isomorphic-fetch';

import {
  REQUEST_MEASURES,
  REQUEST_USER_INFO
} from './types';

export function retrieve(url, context=null) {
  return new Promise((resolve) =>
    fetch(url, {credentials: 'same-origin'})
      .then(req => req.json())
      .then(json => {
        if (context) {
          return resolve([json, context]);
        } else {
          return resolve(json);
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
