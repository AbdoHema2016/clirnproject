import React from 'react';
import {StatusBar, Platform, Text, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import FlashMessage from 'react-native-flash-message';
import {MenuProvider} from 'react-native-popup-menu';
import Router from './src/RouterComponent';
import store from './src/store';
import {appJSFunctions} from './src/utilities/InitialFunctionCallFromApp';
import {IS_PRODUCTION} from './src/config';
import {APP_NAME, APP_SECRET} from './src/config';
import {setI18nConfig} from './src/Localization';
import * as RNLocalize from 'react-native-localize';
import {axios} from './src/network/request';
import {Constants, Layout} from './src/utilities';
import {translate} from './src/Localization';
import AsyncStorage, {AsyncConstants} from './src/utilities/AsyncStorage';
import {version} from './package.json';
const {URLS} = Constants;
import ForceUpdate from './src/containers/forceUpdate';
import {meAccessAskShow} from './src/containers/dashBoard/Home/redux/actions';
import Instabug from 'instabug-reactnative';
import {INSTABUG_TOKEN} from './src/config';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
const {HEX_COLOR_CODES, FONTS} = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    setI18nConfig();
    Instabug.startWithToken(INSTABUG_TOKEN, [Instabug.invocationEvent.shake]);
    this.state = {
      updateRequired: false,
    };
  }
  checkUpdate = async () => {
    let appVersion = version.split('-')[0];
    try {
      let url = `${URLS.API_BASE_URL + URLS.FORCE_UPDATE}?${
        URLS.OPERATING_SYSTEM
      }=${Platform.OS}&${URLS.VERSION}=${appVersion}`;
      let {data} = await axios.get(url);
      let updateRequired = data?.data?.status;
      if (updateRequired) {
        this.setState({updateRequired});
      }
    } catch {
      return;
    }
  };
  saveInstallTime = async () => {
    try {
      let installTime = await AsyncStorage.getItemFromStorage(
        AsyncConstants.APP_INSTALL_TIME,
      );

      if (!installTime) {
        let date = Date.now();
        await AsyncStorage.setItemInStorage(
          AsyncConstants.APP_INSTALL_TIME,
          date,
        );
      }
    } catch {
      return;
    }
  };
  isTesting() {
    if (process?.env?.NODE_ENV === 'test') {
      Instabug.setWelcomeMessageMode(Instabug?.welcomeMessageMode?.disabled);
    }
  }

  componentDidMount() {
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
    this.checkUpdate();
    this.saveInstallTime();
    this.isTesting();
    appJSFunctions();
  }
  componentWillUnmount() {
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
  }
  handleLocalizationChange = () => {
    setI18nConfig();
    this.forceUpdate();
  };

  render() {
    let {updateRequired} = this.state;
    return updateRequired ? (
      <ForceUpdate />
    ) : (
      <Provider store={store}>
        <StatusBar barStyle={'dark-content'} />
        <ActionSheetProvider>
          <MenuProvider>
            <>
              {IS_PRODUCTION === 'false' && (
                <Text style={Style.staging}>
                  {translate('STRINGS.STAGING_BUILD')}
                  {version}
                </Text>
              )}
              <Router />
            </>
          </MenuProvider>
        </ActionSheetProvider>
        <FlashMessage position="top" />
      </Provider>
    );
  }
}

export default App;
const Style = StyleSheet.create({
  staging: {
    position: 'absolute',
    top: '4%',
    zIndex: 1,
    color: HEX_COLOR_CODES.GREEN_BLUE,
    fontFamily: FONTS.SOFIA_BOLD,
  },
});
