import {
  SELECT_TEMP_TYPE_ACTION,
  SELECT_TEMP_INT_ACTION,
  SELECT_TEMP_DEC_ACTION,
  SEND_TEMP_ACTION,
  SEND_TEMP_FAILURE_ACTION,
  SEND_TEMP_SUCCESS_ACTION,
  TEMP_SKIPPED_ACTION,
} from './types';

export const sendTempAction = (data, token, id) => ({
  type: SEND_TEMP_ACTION,
  payload: {data: data, token: token, id: id},
});

export const setTempTypeAction = (type, int, dec) => ({
  type: SELECT_TEMP_TYPE_ACTION,
  payload: {type, int, dec},
});

export const setTempIntValAction = (val) => ({
  type: SELECT_TEMP_INT_ACTION,
  payload: val,
});

export const setTempDecValAction = (val) => ({
  type: SELECT_TEMP_DEC_ACTION,
  payload: val,
});

export const sendTempSuccessAction = (data) => ({
  type: SEND_TEMP_SUCCESS_ACTION,
  payload: data,
});

export const sendTempFailureAction = (error) => ({
  type: SEND_TEMP_FAILURE_ACTION,
  payload: error,
});

export const tempSkippedAction = (status) => ({
  type: TEMP_SKIPPED_ACTION,
  payload: status,
});
