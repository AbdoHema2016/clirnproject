import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {translate} from '../../Localization';
import {FONTS, layout} from '../../Layout';
import {validateEmail} from '../Validations';
import dayjs from 'dayjs';
import Instabug from 'instabug-reactnative';
import {LOCAL_PATH} from '../../Constants/Paths/LocalPath';
import {
  vaccineStatCodes,
  DATEFORMATS,
  profileStatCodes,
  apiError,
} from '../../Constants/appConstants';
export const errorReportLogger = (error) => {
  console.info(JSON.stringify(error));
  Instabug.reportJSException(error);
};
export const logError = (error) => {
  Instabug.logError(error);
};

export const logInfo = (info) => {
  Instabug.logInfo(info);
};
export const alert = (title, message, onPress) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: () => onPress(0),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => onPress(1)},
    ],
    {cancelable: false},
  );
};

export const getParamValue = (url = '', paramName) =>
  (url.match(new RegExp('[?&]' + paramName + '=([^&]+)')) || [null])[1];
export const daysPassed = (date) => {
  return dayjs().diff(date, 'days');
};
export const isHealthTestPositive = (status, isVerified) => {
  if (isVerified && status === profileStatCodes.GREEN) {
    return LOCAL_PATH.CONFIRMED_ICON;
  }
  if (!isVerified && status === profileStatCodes.GREEN) {
    return LOCAL_PATH.processTick;
  }
  if (isVerified && status === profileStatCodes.RED) {
    return LOCAL_PATH.subInfectedIcon;
  }
  if (!isVerified && status === profileStatCodes.RED) {
    return LOCAL_PATH.outlinedClose;
  }
  if (isVerified && status === profileStatCodes.AMBER) {
    return LOCAL_PATH.amberStatFilled;
  }
  if (!isVerified && status === profileStatCodes.AMBER) {
    return LOCAL_PATH.amberStatOutlined;
  }
  if (status === profileStatCodes.WHITE) {
    return LOCAL_PATH.ADD_IMAGE_ICON;
  }
  return LOCAL_PATH.ADD_IMAGE_ICON;
};

export const checkVaccinationStatus = (status, isVerified) => {
  if (isVerified && status === vaccineStatCodes.RED) {
    return LOCAL_PATH.subInfectedIcon;
  }
  if (!isVerified && status === vaccineStatCodes.RED) {
    return LOCAL_PATH.outlinedClose;
  }
  if (isVerified && status === vaccineStatCodes.GREEN) {
    return LOCAL_PATH.CONFIRMED_ICON;
  }
  if (!isVerified && status === vaccineStatCodes.GREEN) {
    return LOCAL_PATH.processTick;
  }
  if (isVerified && status === vaccineStatCodes.AMBER) {
    return LOCAL_PATH.amberStatFilled;
  }
  if (!isVerified && status === vaccineStatCodes.AMBER) {
    return LOCAL_PATH.amberStatOutlined;
  }
  return LOCAL_PATH.ADD_IMAGE_ICON;
};

export const getJumioError = (error = '') => {
  if (typeof error !== 'string') {
    return error;
  }

  const errorArray = error.split('(');
  return errorArray[0].trim();
};

const flashMessageConfig = {
  floating: true,
  duration: 4000,
  style: {marginTop: layout.isiOS ? 0 : 20},
  textStyle: {fontFamily: FONTS.FUTURA},
  titleStyle: {fontFamily: FONTS.FUTURA},
};

export const showErrorMessage = (alertMessage, options = {}) =>
  showMessage({
    message: String(alertMessage),
    type: 'danger',
    ...flashMessageConfig,
    ...options,
  });

export const showSuccessMessage = (
  alertMessage,
  options = {},
  title = 'Success!',
) =>
  showMessage({
    message: title,
    description: String(alertMessage),
    type: 'success',
    ...flashMessageConfig,
    ...options,
  });

export const showInfoMessage = (alertMessage, options = {}) =>
  showMessage({
    message: 'Info!',
    description: String(alertMessage),
    type: 'info',
    ...flashMessageConfig,
    ...options,
  });

export const getAPIError = (error) => {
  const {response: {status} = {}} = error;
  errorReportLogger(error);
  if (
    (!error?.response?.data?.message && !error.message) ||
    status === apiError.badRequest
  ) {
    return translate('STRINGS.SOMETHING_WENT_WRONG');
  }

  if (status === apiError.notAuthorized) {
    return translate('STRINGS.SESSION_EXPIRED');
  }

  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (__DEV__ && error.message) {
    return error.message;
  }

  return translate('STRINGS.SOMETHING_WENT_WRONG');
};

export const keyExtractor = (item) => String(item.id);

export const intoHiddenEmail = (email = '') => {
  if (!validateEmail(email)) {
    return '';
  }

  const splitEmailArray = email.split('@');
  const accountName = splitEmailArray[0];
  const domainName = splitEmailArray[1];

  if (accountName.length <= 2) {
    return email;
  }

  const firstCharacter = accountName.charAt(0);
  const lastCharacter = accountName.charAt(accountName.length - 1);
  const clippedName = accountName.slice(1, -1);

  let hiddenEmail = '';
  hiddenEmail = firstCharacter + clippedName.replace(/./g, '*') + lastCharacter;
  hiddenEmail += '@' + domainName;

  return hiddenEmail;
};

export const intoWordCase = (string = '') =>
  string
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

export const formatDate = (date) => {
  let duration = dayjs().to(date);
  if (duration.includes('hours')) {
    duration = translate('STRINGS.TODAY');
  }
  let fixedDate = dayjs(date, DATEFORMATS.PROFILE_HEALTH_TEST).format(
    DATEFORMATS.COMPANY_ADDITION,
  );
  return `${fixedDate}, ${duration}`;
};

export const formatCheckedInDate = (date) => {
  let duration = dayjs().to(date);
  return `${duration}`;
};

export const formatNotificationDate = (date) => {
  let fixedDate = dayjs(date, DATEFORMATS.TEMPERATURE_DATE).format(
    DATEFORMATS.VACCINE_DATE,
  );
  return `${fixedDate}`;
};

export function getTestIdentifiers(id) {
  return {testID: id, accessibilityLabel: id};
}
