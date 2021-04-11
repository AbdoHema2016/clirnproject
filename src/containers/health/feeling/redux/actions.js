import {
  FEELING_SELECTED_ACTION,
  FEELING_SUCCESS_ACTION,
  FEELING_FAILURE_ACTION,
  SEND_HEALTH_STAT_ACTION,
  STORE_STAT_ID_ACTION,
  STAT_ID_SKIPPED_ACTION,
} from './type';

export const feelingSelectedAction = (feeling, index) => {
  return {
    type: FEELING_SELECTED_ACTION,
    payload: {value: feeling, index: index},
  };
};

export const storeStatIdAction = (id) => {
  return {
    type: STORE_STAT_ID_ACTION,
    payload: id,
  };
};

export const sendHealthStatAction = (data) => {
  return {
    type: SEND_HEALTH_STAT_ACTION,
    payload: data,
  };
};

export const feelingSuccessAction = (feeling) => {
  return {
    type: FEELING_SUCCESS_ACTION,
    payload: feeling,
  };
};

export const feelingFailureAction = (error) => {
  return {
    type: FEELING_FAILURE_ACTION,
    payload: error,
  };
};

export const skipStatsAction = (status) => ({
  type: STAT_ID_SKIPPED_ACTION,
  payload: status,
});
