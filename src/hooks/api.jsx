/**
 * Object Request Header
 */
let access = "";
if (typeof window !== "undefined") {
  access =
    localStorage.getItem("deep-access") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI0OWIyNzc3LWNjZjUtNDhhNy05NmRjLTM0M2VkZWYxYmJlMyIsImlhdCI6MTY5NTY1MDc4NCwiZXhwIjoxNjk1NzM3MTg0fQ.2fyUQdHl8uwuX1FMydhXMDK_oQdVEes-0fZyZ3uMXS0"
}
export const requestHeader = {
  Accept: "application/json",
  "Cache-Control": "no-cache",
  "Content-Type": "application/json",
  "deep-token": access,
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

let API_USER_URL = "http://192.81.213.226:81/82";

export async function request(url, method, payload, token, text, form) {
  if (form === true) {
    requestHeader["Content-Type"] = "multipart/form-data";
  } else {
    requestHeader["Content-Type"] = "application/json";
  }

  if (method === "GET") {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  } else {
    return fetch(API_USER_URL + url, {
      method,
      headers: Object.assign(requestHeader),
      body: form === true ? payload : JSON.stringify(payload),
    })
      .then((res) => {
        if (text === true) {
          return res.text();
        } else if (res) {
          return res.json();
        } else {
          return res.json();
        }
      })
      .catch((err) => {
        console.error(`Request Error ${url}: `, err);
        throw new Error(err);
      });
  }
}
