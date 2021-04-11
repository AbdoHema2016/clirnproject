import Axios, {AxiosRequestConfig} from 'axios';
import {Constants} from '../utilities';
import {translate} from '../Localization';

const {URLS} = Constants;
import {RouterMethodsObj} from '../RouterMethods';
import {errorReportLogger} from '../utilities';

export const axios = Axios.create({
  baseURL: URLS.API_BASE_URL,
  validateStatus: (status) =>
    status === 200 || status === 201 || status === 204 || status === 401,
});

export const request = (config: AxiosRequestConfig) =>
  axios(config).then((response) => {
    const exceptionUrls = [URLS.LOGIN_URL, URLS.SIGNOUT_URL];
    if (response.status >= 400 && !config?.data?.password) {
      errorReportLogger(response);
    }
    if (
      response.status === 401 &&
      exceptionUrls.includes(response.config.url)
    ) {
      throw response;
    }

    if (
      response.status === 401 &&
      !exceptionUrls.includes(response.config.url)
    ) {
      const authorization = response.config.headers?.Authorization ?? '';
      const authorizationArray = authorization.split(' ');
      const accessToken = authorizationArray[1];
      RouterMethodsObj.logout(accessToken);
      throw {
        response: {
          data: {
            message: translate('STRINGS.SESSION_EXPIRED'),
            response: response,
          },
        },
      };
    }
    return response;
  });
