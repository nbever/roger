import isNil from 'lodash/isNil';

const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const DELETE = 'DELETE';

export const NEW = 'NEW';

const iFetch = async (method, url, body) => {

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const request = {
    method, headers
  };

  if (!isNil(body)) {
    request.body = JSON.stringify(body);
  }

  return await fetch(url, request);
}

export const login = async (username, password) => {
  const response = await iFetch(POST, '/api/login', {
      username, password
    });

  return response.json();
};

export const getActiveCalls = async () => {
  const calls = await iFetch(GET, '/api/calls');
  return calls.json();
};

export const logout = async () => {
  await iFetch(PUT, '/api/logout');
};

export const addCall = async (call) => {
  await iFetch(POST, '/api/call', call);
};
