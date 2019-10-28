import isNil from 'lodash/isNil';

const POST = 'POST';
const GET = 'GET';
const PUT = 'PUT';
const DELETE = 'DELETE';

export const NEW = 'NEW';
export const ASSIGN = 'ASSIGN';
export const UNASSIGN = 'UNASSIGN';
export const COMPLETE = 'COMPLETE';

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

export const assignCall = async (call, username) => {
  await iFetch(PUT, `/api/assign/${username}/${call.callId}`);
};

export const unassignMe = async (call) => {
  await iFetch(PUT, `/api/unassign/${call.callId}`);
};

export const completeCall = async (call) => {
  await iFetch(DELETE, `/api/call/${call.callId}`);
};
