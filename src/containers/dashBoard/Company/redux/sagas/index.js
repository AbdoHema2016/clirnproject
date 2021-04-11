import {takeLatest, put, call} from 'redux-saga/effects';
import {
  GET_ALL_COMPANIES,
  SHOW_COMPANY_IN_PROFILE,
  SET_REMOTE_WORKING,
  REMOVE_COMPANY,
  GET_REMOTE_REASONS,
} from '../actions/types';
import {
  getAllCompaniesSuccess,
  getAllCompaniesFailure,
  showCompanyProfileFailure,
  setRemoteWorkingFailure,
  removeCompanyFailure,
  getRemoteReasonsSuccess,
  getRemoteReasonsFailure,
} from '../actions';
import {getApi, deleteApi, putApi} from '../../../../../network/Network';
import {Constants, HelperFunctions} from '../../../../../utilities';
import {request} from '../../../../../network/request';
import {ProfleMethodsObj} from '../../../Home/Methods';
import AsyncStorage, {
  AsyncConstants,
} from '../../../../../utilities/AsyncStorage';
const {showErrorMessage, getAPIError} = HelperFunctions;
const {URLS, requestMethods} = Constants;

function* getAllCompanies() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.GET_COMPANIES,
      access_token,
    });
    const response = yield responsejson;
    yield put(getAllCompaniesSuccess(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getAllCompaniesFailure(error));
  }
}

export function* getCompaniesWatcher() {
  yield takeLatest(GET_ALL_COMPANIES, getAllCompanies);
}
function* showCompanyProfile(action) {
  try {
    const {token, company_id} = action.payload;

    const requestConfig = {
      method: requestMethods.patch,
      url: `${URLS.GET_COMPANIES}/${company_id}/${URLS.DEFAULT_COMPANY}`,
      headers: {Authorization: `Bearer ${token}`},
    };

    yield call(request, requestConfig);
    yield put({
      type: GET_ALL_COMPANIES,
      payload: token,
    });
    ProfleMethodsObj._onRefresh();
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(showCompanyProfileFailure(error));
  }
}

export function* showCompanyProfileWatcher() {
  yield takeLatest(SHOW_COMPANY_IN_PROFILE, showCompanyProfile);
}

function* setRemoteWorking(action) {
  try {
    const {company_id, reason} = action.payload;
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    yield call(putApi, {
      url: URLS.GET_COMPANIES,
      suffix: URLS.WORKING_REMOTELY,
      id: company_id,
      access_token,
      body: {
        reason: reason ? reason : null,
      },
    });
    const responsejson = yield call(getApi, {
      url: URLS.GET_COMPANIES,
      access_token,
    });
    const response = yield responsejson;
    yield put(getAllCompaniesSuccess(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(setRemoteWorkingFailure(error));
  }
}

export function* setRemoteWorkingWatcher() {
  yield takeLatest(SET_REMOTE_WORKING, setRemoteWorking);
}

function* removeCompany(action) {
  const {removedCompanyID} = action.payload;
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    yield call(deleteApi, {
      url: URLS.REMOVE_EMPLOYER,
      access_token,
      body: {
        company_id: removedCompanyID,
      },
    });
    yield put({
      type: GET_ALL_COMPANIES,
      payload: access_token,
    });
  } catch (error) {
    yield put(removeCompanyFailure(error));
    showErrorMessage(getAPIError(error));
  }
}
export function* removeCompanyWatcher() {
  yield takeLatest(REMOVE_COMPANY, removeCompany);
}

function* getRemoteReasons() {
  try {
    const access_token = yield AsyncStorage.getItemFromStorage(
      AsyncConstants.USER_TOKEN,
    );
    const responsejson = yield call(getApi, {
      url: URLS.REMOTE_WORKING_REASONS,
      access_token,
    });
    const response = yield responsejson;
    yield put(getRemoteReasonsSuccess(response.data));
  } catch (error) {
    showErrorMessage(getAPIError(error));
    yield put(getRemoteReasonsFailure(error));
  }
}

export function* getRemoteReasonsWatcher() {
  yield takeLatest(GET_REMOTE_REASONS, getRemoteReasons);
}
