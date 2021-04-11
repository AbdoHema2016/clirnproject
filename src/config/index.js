import env from 'react-native-config';

export const IS_PRODUCTION = env.IS_PRODUCTION;
export const API_BASE_URL = env.API_BASE_URL;
export const JUMIO_CALLBACK_URL = env.JUMIO_CALLBACK_URL;
export const APP_NAME = env.APP_NAME;
export const APP_SECRET = env.APP_SECRET;
export const APP_BUNDLE_ID = env.APP_BUNDLE_ID;
export const APK_COMMON_PATH = env.APK_COMMON_PATH;
export const INSTABUG_TOKEN = env.INSTABUG_TOKEN;

export default {
  API_BASE_URL,
  IS_PRODUCTION,
  JUMIO_CALLBACK_URL,
  APP_NAME,
  APP_SECRET,
  APP_BUNDLE_ID,
  APK_COMMON_PATH,
  INSTABUG_TOKEN,
};
