import {
  NOTIFICATIONS_FAILURE_ACTION,
  NOTIFICATIONS_SUCCESS_ACTION,
  GET_NOTIFICATIONS_ACTION,
  DELETE_NOTIFICATIONS_ACTION,
  DELETE_NOTIFICATIONS_FAILURE_ACTION,
  DELETE_NOTIFICATIONS_SUCCESS_ACTION,
  CHANGE_NOTIFICATION_STATUS_ACTION,
} from './types';

export const getNotificationsAction = () => ({
  type: GET_NOTIFICATIONS_ACTION,
});

export const changeNotificationStatusAction = (updatedNotifications) => ({
  type: CHANGE_NOTIFICATION_STATUS_ACTION,
  payload: updatedNotifications,
});

export const notificationFailureAction = (error) => ({
  type: NOTIFICATIONS_FAILURE_ACTION,
  payload: error,
});

export const notificationSuccessAction = (data) => ({
  type: NOTIFICATIONS_SUCCESS_ACTION,
  payload: data,
});

export const deleteNotificationsAction = (data) => ({
  type: DELETE_NOTIFICATIONS_ACTION,
  payload: {id: data.id, access_token: data.access_token},
});

export const deleteNotificationFailureAction = (error) => ({
  type: DELETE_NOTIFICATIONS_FAILURE_ACTION,
  payload: error,
});

export const deleteNotificationSuccessAction = (data) => ({
  type: DELETE_NOTIFICATIONS_SUCCESS_ACTION,
  payload: data,
});
