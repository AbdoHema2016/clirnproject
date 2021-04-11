import ReactNativeBiometrics from 'react-native-biometrics';
import {showErrorMessage, getAPIError} from '../../utilities';
import {translate} from '../../Localization';

export async function checkIfBiometricIdIsSupported() {
  try {
    let {available} = await ReactNativeBiometrics.isSensorAvailable();
    return available;
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}

export async function createBiometricId() {
  try {
    let available = await checkIfBiometricIdIsSupported();
    if (available) {
      let {publicKey} = await ReactNativeBiometrics.createKeys();
      return publicKey;
    }
    return available;
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}

export async function ifKeyAlreadyExists() {
  try {
    let {keysExist} = await ReactNativeBiometrics.biometricKeysExist();
    return keysExist;
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}

export async function deleteKeys() {
  try {
    let {keysDeleted} = await ReactNativeBiometrics.deleteKeys();
    return keysDeleted;
  } catch (error) {
    showErrorMessage(getAPIError(error));
  }
}

export async function createSignature(message, payload) {
  try {
    let {signature} = await ReactNativeBiometrics.createSignature({
      promptMessage: message,
      payload: payload,
    });

    return signature;
  } catch (error) {
    showErrorMessage(translate('STRINGS.SOMETHING_WENT_WRONG'));
  }
}
