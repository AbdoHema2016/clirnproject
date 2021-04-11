import types from './types';

const getJumioCredentials = (params) => ({
  type: types.GET_JUMIO_CREDENTIALS_REQUESTED,
  params,
});

export {getJumioCredentials};
