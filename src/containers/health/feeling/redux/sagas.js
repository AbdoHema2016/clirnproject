// Imports: Dependencies
import {takeLatest, put, call} from 'redux-saga/effects';
import {SEND_HEALTH_STAT_ACTION} from './type';
import {feelingFailureAction, feelingSuccessAction} from './actions';
import {ProfleMethodsObj} from '../../../dashBoard/Home/Methods/profileMethods';
import {signUpStepAction} from '../../../onBoarding/personalDetails/redux/actions';
import {postApiWithToken} from '../../../../network/Network';
import NavigationService from '../../../../Navigation/NavigationService';
import {Constants, HelperFunctions} from '../../../../utilities';
import AsyncStorage, {AsyncConstants} from '../../../../utilities/AsyncStorage';
import temperatureHelperFunctions from '../../../dashBoard/Settings/temperatureResults/helperFunctions';
const {URLS, signUpSteps} = Constants;
const {showErrorMessage, getAPIError} = HelperFunctions;

function* sendHealthStat(action) {
  try {
    const {via, params, modalIndex, token} = action.payload;
    const responsejson = yield call(postApiWithToken, {
      params: params,
      url: URLS.HEALTH_DETAILS,
      access_token: token,
    });

    const response = yield responsejson;

    if (via === 'profile') {
      yield put(feelingSuccessAction(response.data));
      ProfleMethodsObj.onMountMethods();
      if (modalIndex === -1) {
        temperatureHelperFunctions.getHistoryAction();
      }
      return;
    }

    yield put(feelingSuccessAction(response.data));
    yield put(signUpStepAction(signUpSteps.Temperature));
    AsyncStorage.setItemInStorage(AsyncConstants.STEP, signUpSteps.Temperature);
    AsyncStorage.setItemInStorage('STATID', response.data.data.id);
    NavigationService.navigation.navigate('Temperature');
  } catch (error) {
    showErrorMessage(getAPIError(error));

    yield put(feelingFailureAction(error));
  }
}

export function* healthStatWatcher() {
  yield takeLatest(SEND_HEALTH_STAT_ACTION, sendHealthStat);
}
