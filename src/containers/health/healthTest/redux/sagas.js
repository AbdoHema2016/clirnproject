import {takeLatest, put, call} from 'redux-saga/effects';
import {
  SUBMIT_TEST_DATA_ACTION,
  UPLOAD_HEALTH_TEST_IMAGE_ACTION,
  UPDATE_TEST_ACTION,
} from './types';
import {
  testApiFailureAction,
  testApiSuccessAction,
  uploadHealthTestAction,
  uploadImageFailureAction,
  updateTestSuccessAction,
  updateTestFailureAction,
} from './actions';
import {healthTestDetailsAction} from '../../../dashBoard/HealthTests/Results/redux/actions';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import {
  multipartPostApiWithToken,
  getApi,
  putApi,
} from '../../../../network/Network';
import {ProfleMethodsObj} from '../../../dashBoard/Home/Methods/profileMethods';
import {HelperFunctions, Constants} from '../../../../utilities';
import ModalsQueue from '../../../../services/ModalsQueue';
import {WalkthroughMethodsObj} from '../../../../containers/dashBoard/Home/Methods/walkthroughMethods';
const {modalIds, docTypes, URLS} = Constants;

const {showErrorMessage, getAPIError} = HelperFunctions;

function* submitHealthTestData(action) {
  try {
    const {data, token} = action.payload;
    const responsejson = yield call(multipartPostApiWithToken, {
      params: data,
      url: URLS.HEALTH_TEST_URL,
      access_token: token,
    });
    const response = yield responsejson;
    if (action.payload.via === 'SignUp') {
      AsyncStorage.removeItemFromStorage('PROFILEVISITED');
      ModalsQueue.showModal({
        modalId: modalIds.walkThrough,
        showModalFunction: () =>
          WalkthroughMethodsObj.profileVisitedBefore(false),
      });
    }
    if (action.payload.via !== 'SignUp') {
      ProfleMethodsObj.onMountMethods();
    }
    yield put(testApiSuccessAction(response.data));
  } catch (error) {
    yield put(testApiFailureAction(error));
  }
}

export function* healthTestWatcher() {
  yield takeLatest(SUBMIT_TEST_DATA_ACTION, submitHealthTestData);
}

function* updateHealthData(action) {
  try {
    const {data, healthTestID} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    yield call(putApi, {
      body: data,
      url: URLS.UPDATE_HEALTH_TEST,
      suffix: URLS.UPDATE,
      id: healthTestID,
      access_token,
    });
    yield put(updateTestSuccessAction());
    yield put(healthTestDetailsAction({token: access_token, id: healthTestID}));
  } catch (error) {
    yield put(updateTestFailureAction(error));
  }
}

export function* updateHealthTestWatcher() {
  yield takeLatest(UPDATE_TEST_ACTION, updateHealthData);
}

function* uploadImageS3(presignedData, source, docType, index) {
  try {
    const imageUploadURL = presignedData.data.url;
    let fields = {...presignedData.data.fields};
    const formData = new FormData();
    const imageKey = presignedData.data.key;
    formData.append('key', imageKey);
    fields &&
      Object.keys(fields).forEach((key) => {
        if (key !== 'bucket_name') {
          formData.append(key, fields[key]);
        }
      });
    formData.append('file', source);
    const options = {
      headers: {
        'Content-Type': source.type,
      },
    };
    const responsejson = yield call(multipartPostApiWithToken, {
      specificURL: true,
      url: imageUploadURL,
      params: formData,
      specificConfig: true,
      options,
    });

    let imageLocation = responsejson.request.responseHeaders.Location;
    if (docType === docTypes.HEALTH) {
      let document = {
        name: imageLocation.split('health_test%2F')[1],
      };
      yield put(uploadHealthTestAction(document, index));
    }
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
  }
}
function* uploadImage(action) {
  try {
    let source = action.payload.data;
    const {docType, index, token} = action.payload;
    const data = {
      fileName: source.fileName,
      fileType: source.type,
      type: 'Image',
    };
    let url = `${URLS.PRE_SIGNED}?file=${data.fileName}`;
    if (docType === 'health') {
      url += '&location=health';
    }
    const responsejson = yield call(getApi, {
      url,
      access_token: token,
    });
    const response = yield responsejson;
    yield uploadImageS3(response.data, source, docType, index);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
  }
}

export function* uploadHealthDocs3Watcher() {
  yield takeLatest(UPLOAD_HEALTH_TEST_IMAGE_ACTION, uploadImage);
}
