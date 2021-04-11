/**
 * @format
 */

import React from 'react';
import {AppRegistry, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
async function onAppBootstrap() {
  await messaging().registerDeviceForRemoteMessages();
}
onAppBootstrap();
function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
