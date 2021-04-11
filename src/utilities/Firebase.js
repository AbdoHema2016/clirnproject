import messaging from '@react-native-firebase/messaging';
import AsyncStorage, {AsyncConstants} from '../../src/utilities/AsyncStorage';
import analytics from '@react-native-firebase/analytics';
import {logError, errorReportLogger} from './HelperFunctions/miscellaneous';
export async function requestUserPermission() {
  try {
    await messaging().requestPermission();
  } catch (error) {
    logError(error.message);
  }
}

export async function checkApplicationPermission() {
  try {
    await messaging().requestPermission();
  } catch (error) {
    logError(error.message);
  }
}

export function onMessageReceived(callback) {
  try {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      callback(remoteMessage);
    });

    return unsubscribe;
  } catch (error) {
    logError(error.message);
  }
}

export function onNotificationReceived(callback) {
  try {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      callback(remoteMessage);
    });
  } catch (error) {
    logError(error.message);
  }
}

export function onInitialNotificationReceived(callback) {
  try {
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        callback(remoteMessage);
      });
  } catch (error) {
    logError(error.message);
  }
}

export async function saveTokenFCM(callback) {
  try {
    await messaging().registerDeviceForRemoteMessages();
    if (messaging().isDeviceRegisteredForRemoteMessages) {
      let token = await messaging().getToken();
      AsyncStorage.setItemInStorage(AsyncConstants.DEVICE_TOKEN, token);
      callback(token);
      messaging().onTokenRefresh((refreshToken) => {
        AsyncStorage.setItemInStorage(
          AsyncConstants.DEVICE_TOKEN,
          refreshToken,
        );
        callback(refreshToken);
      });
      return;
    }
    callback(null);
    return;
  } catch (error) {
    callback(null);
    errorReportLogger(error);
  }
}

export async function logAnalyticsScreenView(params) {
  try {
    const {currentRouteName} = params;
    await analytics().logScreenView({
      screen_name: currentRouteName,
      screen_class: currentRouteName,
    });
  } catch (error) {
    logError(error.message);
  }
}

export function logAnalyticsEvent(eventName, params) {
  try {
    analytics().logEvent(eventName, params);
  } catch (error) {
    logError(error.message);
  }
}

export function setUserAnalyticsProperties(params) {
  try {
    analytics().setUserProperties(params);
  } catch (error) {
    logError(error.message);
  }
}
