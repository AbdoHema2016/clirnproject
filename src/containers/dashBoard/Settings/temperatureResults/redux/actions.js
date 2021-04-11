import {
  GET_TEMPERATURE_HISTORY,
  GET_TEMPERATURE_HISTORY_SUCCESS,
  GET_TEMPERATURE_HISTORY_FAILURE,
  UPDATE_TEMPERATURE_HISTORY_MODAL_INDEX_ACTION,
} from './types';

export const getTempHistoryAction = () => ({
  type: GET_TEMPERATURE_HISTORY,
});

export const tempHistoryFailureAction = (error) => ({
  type: GET_TEMPERATURE_HISTORY_FAILURE,
  payload: error,
});

export const tempHistorySuccessAction = (data) => ({
  type: GET_TEMPERATURE_HISTORY_SUCCESS,
  payload: data,
});

export const updateTempHistoryModalIndexAction = (index) => ({
  type: UPDATE_TEMPERATURE_HISTORY_MODAL_INDEX_ACTION,
  payload: index,
});
