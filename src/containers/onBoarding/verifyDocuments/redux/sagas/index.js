import {put, call} from 'redux-saga/effects';
import {getApi} from '../../../../../network/Network';
import {Constants} from '../../../../../utilities';
import types from '../actions/types';
const {URLS} = Constants;

function* getJumioCredentialsSaga({params}) {
  try {
    const {data} = yield call(getApi, {
      access_token: params.access_token,
      url: URLS.GET_JUMIO_CREDENTIALS,
    });

    const {API_SECRET, API_TOKEN, DATACENTER} = data.data;
    yield put({
      type: types.GET_JUMIO_CREDENTIALS_SUCCEEDED,
      payload: {
        apiSecret: API_SECRET,
        apiToken: API_TOKEN,
        dataCenter: DATACENTER,
      },
    });
  } catch (error) {
    yield put({type: types.GET_JUMIO_CREDENTIALS_FAILED, payload: {error}});
  }
}

export {getJumioCredentialsSaga};
