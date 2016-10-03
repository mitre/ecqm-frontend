import axios from 'axios';

export function retrieve(url, context=null) {
  return new Promise((resolve) =>
    axios.get(url, { withCredentials: true })
      .then(response => {
        if (context) {
          return resolve([response.data, context]);
        } else {
          return resolve(response.data);
        }
       }));
}
