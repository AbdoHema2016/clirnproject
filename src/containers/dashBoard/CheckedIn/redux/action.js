import {
  CHECKIN_LIST_ACTION,
  CHECKIN_LIST_SUCCESS_ACTION,
  CHECKIN_LIST_FAILURE_ACTION,
  MANUAL_CHECKOUT,
  MANUAL_CHECKOUT_SUCCESS,
  MANUAL_CHECKOUT_FAILURE,
} from './types';

export const getCheckInListAction = () => ({
  type: CHECKIN_LIST_ACTION,
});
export const getCheckInListSuccessAction = (data) => ({
  type: CHECKIN_LIST_SUCCESS_ACTION,
  payload: data,
});
export const getCheckInListFailureAction = (error) => ({
  type: CHECKIN_LIST_FAILURE_ACTION,
  payload: error,
});

export const manualCheckout = ({visitorId}) => ({
  type: MANUAL_CHECKOUT,
  payload: {visitorId},
});

export const manualCheckoutSuccess = (message) => ({
  type: MANUAL_CHECKOUT_SUCCESS,
  payload: message,
});

export const manualCheckoutFailure = (error) => ({
  type: MANUAL_CHECKOUT_FAILURE,
  payload: error,
});
