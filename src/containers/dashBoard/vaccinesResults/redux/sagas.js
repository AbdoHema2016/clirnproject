import {takeLatest, put, call} from 'redux-saga/effects';
import {
  GET_VACCINATIONS_ACTION,
  DELETE_VACCINE_ACTION,
  UPLOAD_VACCINE_IMAGE,
  UPLOAD_VACCINE_DETAILS,
  EDIT_VACCINE_DETAILS,
  GET_VACCINE_DETAILS_ACTION,
  REVIEW_VACCINE_ACTION,
  GET_VACCINE_TYPES_ACTION,
} from './types';
import {
  vaccinationActionSuccess,
  vaccinationActionFail,
  deleteVaccineSuccess,
  deleteVaccineFail,
  uploadImageFailureAction,
  uploadImageSuccessAction,
  uploadVaccineDetailsFailureAction,
  uploadVaccineDetailsSuccessAction,
  editVaccineDetailsSuccessAction,
  editVaccineDetailsFailureAction,
  getVaccineDetailsSuccessAction,
  getVaccineDetailsFailureAction,
  getVaccineDetailsAction,
  reviewVaccineSuccessAction,
  reivewVaccineFailureAction,
  setVaccineTypesSuccessAction,
  getVaccineTypesFailureAction,
} from './actions';
import {
  getApi,
  deleteApi,
  multipartPostApiWithToken,
  postApiWithToken,
  putApi,
} from '../../../../network/Network';
import {Constants, HelperFunctions, apiError} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import VaccineMethods from '../vaccineDetails/methods';
import {ProfleMethodsObj} from '../../Home/Methods';
import helperMethods from '../vaccineDetails/helperFunctionsForAddVaccine';
import resultsMethods from '../resultsMethods';
const {URLS, docTypes, screenSource} = Constants;
const {showErrorMessage, getAPIError} = HelperFunctions;

function* callVaccinationAPI() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.VACCINATION,
      access_token,
    });
    yield put(vaccinationActionSuccess(responsejson.data.data));
  } catch (error) {
    if (error.response.status !== apiError.notFound) {
      showErrorMessage(getAPIError(error));
    }
    yield put(vaccinationActionFail(error));
  }
}

export function* getVaccinationWatcher() {
  yield takeLatest(GET_VACCINATIONS_ACTION, callVaccinationAPI);
}

function* deleteVaccine(action) {
  const {vaccineId, cb} = action.payload;
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    yield call(deleteApi, {
      url: URLS.VACCINATION + '/' + vaccineId,
      access_token,
    });
    yield put(deleteVaccineSuccess());
    resultsMethods.refreshVaccineResults();
    cb();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(deleteVaccineFail(error));
  }
}

export function* deleteVaccineWatcher() {
  yield takeLatest(DELETE_VACCINE_ACTION, deleteVaccine);
}

function* uploadImageS3(preSignedData, source, docType, cb) {
  try {
    const imageUploadURL = preSignedData.data.url;
    let fields = {...preSignedData.data.fields};
    const formData = new FormData();
    const imageKey = preSignedData.data.key;
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
    if (docType === docTypes.VACCINE) {
      let document = {
        name: imageLocation.split('vaccinations%2F')[1],
      };
      yield put(uploadImageSuccessAction(document));
      cb(document);
    }
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
  }
}
function* getPreSignedURL(action) {
  try {
    const {data: dataSource, docType, cb} = action.payload;
    let source = dataSource;
    let accessToken = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const data = {
      fileName: source.fileName,
      fileType: source.type,
      type: 'Image',
    };
    let url = `${URLS.PRE_SIGNED}?file=${data.fileName}`;
    if (docType === 'vaccine') {
      url += '&location=vaccinations';
    }
    const responsejson = yield call(getApi, {
      url,
      access_token: accessToken,
    });
    const response = yield responsejson;
    yield uploadImageS3(response.data, source, docType, cb);
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadImageFailureAction(error));
  }
}

export function* uploadVaccineImage3Watcher() {
  yield takeLatest(UPLOAD_VACCINE_IMAGE, getPreSignedURL);
}

function* uploadVaccineDetailsAPI(action) {
  try {
    const {data, source} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    yield call(postApiWithToken, {
      params: data,
      url: URLS.VACCINATION,
      access_token,
    });
    yield put(uploadVaccineDetailsSuccessAction());
    if (source === screenSource.ADD_VACCINE) {
      helperMethods.goBack();
      resultsMethods.refreshVaccineResults();
      VaccineMethods.resetVaccineDetails();
      return;
    }
    VaccineMethods.hideVaccineModal(source);
    ProfleMethodsObj._onRefresh();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(uploadVaccineDetailsFailureAction(error));
  }
}

export function* uploadVaccineDetailsWatcher() {
  yield takeLatest(UPLOAD_VACCINE_DETAILS, uploadVaccineDetailsAPI);
}

function* editVaccineDetailsAPI(action) {
  try {
    const {data, id} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(putApi, {
      body: data,
      url: URLS.VACCINATION,
      id,
      access_token,
    });
    const response = yield responsejson;
    yield put(editVaccineDetailsSuccessAction(response.data));
    VaccineMethods.hideVaccineModal();
    resultsMethods.refreshVaccineResults();
    yield put(getVaccineDetailsAction({id}));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(editVaccineDetailsFailureAction(error));
  }
}

export function* editVaccineDetailsWatcher() {
  yield takeLatest(EDIT_VACCINE_DETAILS, editVaccineDetailsAPI);
}

function* getVaccineDetailsAPI(action) {
  try {
    const {id, source} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url:
        source === screenSource.OTHER_USER_PROFILE
          ? URLS.VERIFY_VACCINE_DETAILS + `/${id}`
          : URLS.VACCINATION + `/${id}`,
      access_token,
    });
    const response = yield responsejson;
    yield put(getVaccineDetailsSuccessAction(response.data.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getVaccineDetailsFailureAction(error));
  }
}

export function* getVaccineDetailsWatcher() {
  yield takeLatest(GET_VACCINE_DETAILS_ACTION, getVaccineDetailsAPI);
}

function* verifyVaccine(action) {
  try {
    const {data, id, cb} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const response = yield call(putApi, {
      body: data,
      url: URLS.REVIEW_VACCINE,
      id,
      access_token,
    });
    yield put(reviewVaccineSuccessAction(response));
    cb(true);
  } catch (error) {
    const {cb} = action.payload;

    showErrorMessage(getAPIError(error));
    yield put(reivewVaccineFailureAction(error));
    cb(false);
  }
}

export function* verifyVaccineWatcher() {
  yield takeLatest(REVIEW_VACCINE_ACTION, verifyVaccine);
}

function* getVaccineTypesAPI(action) {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.VACCINE_TYPES,
      access_token,
    });
    const response = yield responsejson;
    const vaccineTypesObj = response.data?.data;
    const vaccineTypesArray = vaccineTypesObj
      .map((vaccineObj) => vaccineObj.name)
      .reverse();
    yield put(setVaccineTypesSuccessAction(vaccineTypesArray));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getVaccineTypesFailureAction(error));
  }
}

export function* getVaccineTypesWatcher() {
  yield takeLatest(GET_VACCINE_TYPES_ACTION, getVaccineTypesAPI);
}
