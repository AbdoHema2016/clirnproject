import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorageUtil {
  static async getItemFromStorage(key) {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  }

  static async getMultipleItemsFromStorage(keys, defaultValue) {
    const value = await AsyncStorage.multiGet(keys);
    if (value !== null) {
      value.forEach((item, index) => {
        value[index][1] = JSON.parse(value[index][1]);
      });
      return value;
    }
    return defaultValue || null;
  }

  static async setItemInStorage(key, value) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }

  static async clear() {
    AsyncStorage.clear();
  }

  static async removeItemFromStorage(key) {
    AsyncStorage.removeItem(key);
  }

  static async removeMultiFromStorage(keys) {
    return AsyncStorage.multiRemove(keys);
  }
}

export default AsyncStorageUtil;

export const AsyncConstants = {
  DEVICE_TOKEN: 'DEVICE_TOKEN',
  STEP: 'STEP',
  USER_TOKEN: 'TOKEN',
  USER_ID: 'USERID',
  MEDATA: 'MEDATA',
  STATID: 'STATID',
  COMPANY_NAME: 'COMPANY_NAME',
  INVITE_ID: 'INVITE_ID',
  LINKING: 'LINKING ',
  PUBLIC_KEY: 'PUBLIC_KEY',
  BIOMETRIC_ID: 'BIOMETRIC_ID',
  PROFILEVISITED: 'PROFILEVISITED',
  USER_EMAIL: 'USER_EMAIL',
  BIOMETRIC_ENABLED: 'BIOMETRIC_ENABLED',
  APP_INSTALL_TIME: 'APP_INSTALL_TIME',
  PERSONALDETAILSACCESSTOKEN: 'PERSONALDETAILSACCESSTOKEN',
  IS_ME_ID_SAVED: 'IS_ME_ID_SAVED',
};
