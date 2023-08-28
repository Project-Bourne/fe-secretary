/**
 * Object Request Header
 */
export const requestHeader = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json',
  'deep-token':
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGE5ZmIxLTRlMzktNDRiNC1hZjM2LTc2MDNkMjJlMDMzMCIsInJvbGUiOiIxIiwiaWF0IjoxNjkzMTQ1NTQyLCJleHAiOjE2OTMyMzE5NDJ9.PtnkEh2TUnQ8AGLx1rOYG6vE2bdO8HDw2hp4hgItnt4'
};

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload (body)
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @returns Response Data;
 */

let API_USER_URL = 'http://192.81.213.226:82';

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
