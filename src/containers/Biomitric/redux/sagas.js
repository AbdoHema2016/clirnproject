import {takeLatest, put, call} from 'redux-saga/effects';
import {
  SEND_PUBLIC_KEY,
  BIOMETRIC_SIGN_ACTION,
  UPDATE_PUBLIC_KEY,
} from './types';
import {
  publicKeyCreationSuccessAction,
  publicKeyCreationFailAction,
} from './actions';
import {postApiWithToken, postApi} from '../../../network/Network';
import {Constants, HelperFunctions} from '../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import {getLoginApiError} from '../../onBoarding/SignIn/redux/errorMethods';
import {
  SignInSuccessAction,
  SignInFailureAction,
  StoreToken,
  TokenStored,
} from '../../onBoarding/SignIn/redux/actions';

const {getAPIError, showErrorMessage} = HelperFunctions;
const {URLS} = Constants;

function* sendPublicKeyAPI(action) {
  try {
    const {publicKey, token, userID, firstVisit} = action.payload;
    const responsejson = yield call(postApiWithToken, {
      url: URLS.ENABLE_BIOMETRIC,
      access_token: token,
      params: {
        biometric_enable: 1,
        public_key: publicKey,
      },
    });
    const {data} = yield responsejson;
    AsyncStorage.setItemInStorage(AsyncConstants.BIOMETRIC_ID, data.data.id);
    if (firstVisit) {
      yield put(StoreToken(token, userID, null, true));
      AsyncStorage.removeItemFromStorage(AsyncConstants.PROFILEVISITED);
    }
    if (!firstVisit) {
      yield put(TokenStored(token, userID));
    }
    yield put(publicKeyCreationSuccessAction());
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(publicKeyCreationFailAction(error));
  }
}

export function* sendPublicKeyWatcher() {
  yield takeLatest(SEND_PUBLIC_KEY, sendPublicKeyAPI);
}

function* sendSignature(action) {
  try {
    let {biometric_id, device_token, email, signature} = action.payload;
    const response = yield call(postApi, {
      url: URLS.BIOMETRIC_SIGN,
      params: {
        email,
        signature,
        device_token,
        biometric_id,
      },
    });
    yield put(SignInSuccessAction(response.data));
    yield put(
      StoreToken(
        response.data.data.access_token,
        response.data.data.id,
        response.data.data.me_data,
        !response.data.data.me_data,
      ),
    );
  } catch (error) {
    showErrorMessage(getLoginApiError(error));
    yield put(SignInFailureAction());
  }
}
export function* sendSignatureWatcher() {
  yield takeLatest(BIOMETRIC_SIGN_ACTION, sendSignature);
}

function* updatePublicKey(action) {
  try {
    const {publicKey, token, userID, biometricEnabled} = action.payload;
    const responsejson = yield call(postApiWithToken, {
      url: URLS.ENABLE_BIOMETRIC,
      access_token: token,
      params: {
        biometric_enable: biometricEnabled,
        public_key: publicKey,
      },
    });
    const {data} = yield responsejson;
    AsyncStorage.setItemInStorage(AsyncConstants.BIOMETRIC_ID, data.data.id);
    yield put(TokenStored(token, userID));
    yield put(publicKeyCreationSuccessAction());
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(publicKeyCreationFailAction(error));
  }
}
export function* updatePublicKeyWatcher() {
  yield takeLatest(UPDATE_PUBLIC_KEY, updatePublicKey);
}
