import {
  GET_SHARE_HISTORY_ACTION,
  SHARE_HISTORY_SUCCESS_ACTION,
  SHARE_HISTORY_FAILURE_ACTION,
} from './types';

export const getShareHistoryAction = () => ({
  type: GET_SHARE_HISTORY_ACTION,
});

export const shareHistoryFailureAction = (error) => ({
  type: SHARE_HISTORY_FAILURE_ACTION,
  payload: error,
});

export const shareHistorySuccessAction = (data) => ({
  type: SHARE_HISTORY_SUCCESS_ACTION,
  payload: data,
});
