import fetch from 'isomorphic-fetch';

const token = sessionStorage.getItem("accessToken")
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  version: 'qa',
  Authorization: `Bearer ${token}`
};

export function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  }).then(response => response);
}

export function get(url) {
  return fetch(url, {
    method: 'GET',
    headers,
  }).then(response => response.json());
}
