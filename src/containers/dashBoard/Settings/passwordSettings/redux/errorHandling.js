import {Constants} from '../../../../../utilities';
import {translate} from '../../../../../Localization';

const {apiError} = Constants;

export const getAPIError = (error) => {
  const {
    response: {status},
  } = error;
  if (status === apiError.notFound) {
    return translate('STRINGS.SOMETHING_WENT_WRONG');
  }

  if (status === apiError.badRequest) {
    let errorObj = error?.response?.data?.errors;
    let key = Object.keys(errorObj);
    return errorObj[key];
  }

  if (status === apiError.notAuthorized) {
    return translate('STRINGS.SESSION_EXPIRED');
  }

  if (__DEV__ && error.message) {
    return error.message;
  }

  return error.response.data.message;
};
