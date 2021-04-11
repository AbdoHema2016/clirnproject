import {
  requestUserPermission,
  saveTokenFCM,
  onMessageReceived,
  onNotificationReceived,
} from './Firebase';

export function appJSFunctions() {
  requestUserPermission();
  componentMethods();
  onNotificationReceived((callback) => {});
  onMessageReceived((callback) => {});
}

export async function deviceToken(callback) {
  try {
    await saveTokenFCM((token) => {
      callback(token);
    });
  } catch (error) {
    callback(null);
    console.error(error);
  }
}

function componentMethods() {
  onMessageReceived((callback) => {});
}
