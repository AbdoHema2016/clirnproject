import {
  DO_SIGN_IN_ACTION,
  SIGN_IN_FAILURE_ACTION,
  SIGN_IN_SUCCESS_ACTION,
  STORE_TOKEN_ACTION,
  TOKEN_STORED_ACTION,
  REMOVE_TOKEN_ACTION,
  STORE_DEVICE_TOKEN_ACTION,
  STORE_UDERID_ACTION,
} from './types';

export const loginAction = (username, password) => ({
  type: DO_SIGN_IN_ACTION,
  payload: {username: username, password: password},
});

export const storeUserIdAction = (id) => ({
  type: STORE_UDERID_ACTION,
  payload: id,
});

export const SignInSuccessAction = (response) => ({
  type: SIGN_IN_SUCCESS_ACTION,
  payload: response,
});

export const SignInFailureAction = () => ({
  type: SIGN_IN_FAILURE_ACTION,
});

export const StoreToken = (token, id, meData, newAccount = false) => ({
  type: STORE_TOKEN_ACTION,
  payload: {token, id, meData, newAccount},
});

export const TokenStored = (token, id) => ({
  type: TOKEN_STORED_ACTION,
  payload: {token: token, id: id},
});

export const removeToken = () => ({
  type: REMOVE_TOKEN_ACTION,
});

export const StoreDeviceToken = (token) => ({
  type: STORE_DEVICE_TOKEN_ACTION,
  payload: token,
});
