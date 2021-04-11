import {takeLatest, put, call} from 'redux-saga/effects';
import {
  GET_HEALTH_TESTS_ACTION,
  HEALTH_TEST_DETAILS_ACTION,
  HEALTH_TEST_DELETE_ACTION,
  EDIT_REJECTED_HEALTH_TEST_IMAGE_ACTION,
} from '../actions/types';
import {
  healthTestActionSuccess,
  healthTestActionFail,
  healthTestDetailsActionSuccess,
  healthTestDetailsActionFail,
  healthTestDeleteActionFail,
  healthTestDeleteActionSuccess,
  editRejectedHealTestImageFailureAction,
} from '../actions/index';
import {updateHealthDataAction} from '../../../../../health/healthTest/redux/actions';
import {
  getApi,
  deleteApi,
  multipartPostApiWithToken,
} from '../../../../../../network/Network';
import {
  Constants,
  HelperFunctions,
  apiError,
} from '../../../../../../utilities';
import AsyncStorage, {
  AsyncConstants,
} from '../../../../../../utilities/AsyncStorage';
import methods from '../../ResultsMethods';
const {URLS} = Constants;
const {showErrorMessage, getAPIError} = HelperFunctions;

function* callHealthTestsAPI(action) {
  try {
    const responsejson = yield call(getApi, {
      url: URLS.HEALTH_TEST_RESULTS,
      access_token: action.payload.access_token,
    });
    if (responsejson?.data) {
      yield put(healthTestActionSuccess(responsejson.data.data));
      return;
    }
    yield put(healthTestActionSuccess(!!responsejson));
  } catch (error) {
    if (error.response.status !== apiError.notFound) {
      showErrorMessage(getAPIError(error));
    }
    yield put(healthTestActionFail(error));
  }
}

export function* getHealthTestsWatcher() {
  yield takeLatest(GET_HEALTH_TESTS_ACTION, callHealthTestsAPI);
}

function* callHealthTestDetailsAPI(action) {
  try {
    const {token, id} = action.payload;
    const responsejson = yield call(getApi, {
      url: URLS.HEALTH_TEST_URL + `/${id}`,
      access_token: token,
    });
    if (responsejson?.data) {
      yield put(healthTestDetailsActionSuccess(responsejson.data.data));
    }
  } catch (error) {
    if (error.response.status !== apiError.notFound) {
      showErrorMessage(getAPIError(error));
    }
    yield put(healthTestDetailsActionFail(error));
  }
}

export function* getHealthTestDetailsWatcher() {
  yield takeLatest(HEALTH_TEST_DETAILS_ACTION, callHealthTestDetailsAPI);
}

function* deleteHealthTest(action) {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const {id} = action.payload;
    yield call(deleteApi, {
      url: URLS.HEALTH_TEST_URL + '/' + id,
      access_token,
    });
    yield put(healthTestDeleteActionSuccess());
    methods.refreshTests();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(healthTestDeleteActionFail(error));
  }
}

export function* deleteHealthTestWatcher() {
  yield takeLatest(HEALTH_TEST_DELETE_ACTION, deleteHealthTest);
}

function* uploadImageS3(presignedData, source, testData, userID) {
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
    let document = {
      name: imageLocation.split('health_test%2F')[1],
    };
    testData.document = document.name;
    yield put(
      updateHealthDataAction({
        data: testData,
        healthTestID: testData.id,
      }),
    );
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(editRejectedHealTestImageFailureAction(error));
  }
}
function* uploadImage(action) {
  try {
    let source = action.payload.source;
    let testData = action.payload.testData;
    const {docType, accessToken, userID} = action.payload;
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
      access_token: accessToken,
    });
    const response = yield responsejson;
    yield uploadImageS3(response.data, source, testData, userID);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(editRejectedHealTestImageFailureAction(error));
  }
}

export function* uploadRejectedTestImage() {
  yield takeLatest(EDIT_REJECTED_HEALTH_TEST_IMAGE_ACTION, uploadImage);
}
