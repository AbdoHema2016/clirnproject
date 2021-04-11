import {translate} from '../../../../Localization';

export const getLoginApiError = (error) => {
  if (!error?.data?.message && !error.message) {
    return translate('STRINGS.SOMETHING_WENT_WRONG');
  }
  if (!error.data && error.message) {
    return error.message;
  }
  return error.data.message;
};
