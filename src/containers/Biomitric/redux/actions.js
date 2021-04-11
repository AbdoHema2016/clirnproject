import {
  SEND_PUBLIC_KEY,
  PUBLIC_KEY_CREATED,
  PUBLIC_KEY_CREATE_FAIL,
  BIOMETRIC_SIGN_ACTION,
  UPDATE_PUBLIC_KEY,
} from './types';
export const sendPublicKeyAction = (payload) => ({
  type: SEND_PUBLIC_KEY,
  payload,
});

export const publicKeyCreationSuccessAction = () => ({
  type: PUBLIC_KEY_CREATED,
});

export const publicKeyCreationFailAction = (error) => ({
  type: PUBLIC_KEY_CREATE_FAIL,
  payload: error,
});

export const BiometricSignAction = (payload) => ({
  type: BIOMETRIC_SIGN_ACTION,
  payload,
});
export const updatePublicKeyAction = (payload) => ({
  type: UPDATE_PUBLIC_KEY,
  payload,
});
