/**
 * Object Request Header
 */
export const requestHeader = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'deep-token':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjcwYmIwNTAwLThjYmYtNGZkYS1iNzc4LTYwODE2MmQ3OTYxOSIsInJvbGUiOiIxIiwiaWF0IjoxNjkxMTQ2NTAxLCJleHAiOjE2OTEyMzI5MDF9.Qr8Jc3oucOTNmmlf46wgLp8aHxffQqbY8ujZy-vmavU'
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

let API_USER_URL = 'http://localhost:4070';

export async function request(url, method, payload, token, text, form) {
  if (form === true) {
    requestHeader['Content-Type'] = 'multipart/form-data';
  } else {
    requestHeader['Content-Type'] = 'application/json';
  }

  if (method === 'GET') {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader)
    })
      .then(res => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch(err => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload)
    })
      .then(res => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch(err => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  }
}
