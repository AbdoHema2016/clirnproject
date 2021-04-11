import {Constants} from '../utilities';
import {translate} from '../Localization';

import {request} from './request';
import NetInfo from '@react-native-community/netinfo';

const {URLS, requestMethods} = Constants;
export const checkInternet = async () => {
  const networkStatus = await NetInfo.fetch();
  if (!networkStatus.isConnected) {
    const error = new Error(translate('STRINGS.NETWORK_ERROR'));
    error.response = {data: {message: translate('STRINGS.NETWORK_ERROR')}};
    throw error;
  }
};
export function* postApi({url, params}) {
  yield checkInternet();
  return yield request({
    method: requestMethods.post,
    url,
    data: params,
  });
}

export function* postApiWithToken({access_token, url, params}) {
  yield checkInternet();
  return yield request({
    method: requestMethods.post,
    url,
    data: params,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
}

export function* multipartPostApiWithToken({
  params,
  access_token,
  url,
  config,
  specificConfig,
}) {
  checkInternet();
  let configuration = {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  if (specificConfig) {
    configuration = config;
  }

  return yield request({
    method: requestMethods.post,
    url,
    data: params,
    ...configuration,
  });
}

export function* getApi({access_token, url}) {
  yield checkInternet();
  return yield request({
    method: requestMethods.get,
    url,
    headers: {Authorization: `Bearer ${access_token}`},
  });
}

export function* putApi({access_token, suffix, url: requestUrl, id, body}) {
  const url = !suffix
    ? URLS.API_BASE_URL + requestUrl + '/' + id
    : URLS.API_BASE_URL + requestUrl + '/' + id + suffix;
  yield checkInternet();
  return yield request({
    method: requestMethods.put,
    url,
    data: body,
    headers: {Authorization: `Bearer ${access_token}`},
  });
}

export function* deleteApi({url, access_token, body}) {
  yield checkInternet();
  return yield request({
    method: requestMethods.delete,
    url,
    headers: {Authorization: `Bearer ${access_token}`},
    data: body && body,
  });
}

export function* patchApi({url, access_token, data}) {
  yield checkInternet();
  return yield request({
    method: requestMethods.patch,
    url,
    headers: {Authorization: `Bearer ${access_token}`},
    data,
  });
}
