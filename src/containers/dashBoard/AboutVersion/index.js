import React, {useState, useEffect, useCallback} from 'react';
import {View} from 'react-native';
import CLabel from '../../../components/cLabel';
import {Style} from './style';
import {DATEFORMATS, getTestIdentifiers, testIds} from '../../../utilities';
import {translate} from '../../../Localization';

import AsyncStorage, {AsyncConstants} from '../../../utilities/AsyncStorage';
import {version} from '../../../../package.json';
import dayjs from 'dayjs';
const AboutVersion = () => {
  const [installTime, setInstallTime] = useState('');
  useEffect(() => {
    getInstallTime();
  }, [getInstallTime]);

  const getInstallTime = useCallback(async () => {
    try {
      let storageInstallTime = await AsyncStorage.getItemFromStorage(
        AsyncConstants.APP_INSTALL_TIME,
      );
      let formattedDate = formatDate(storageInstallTime);
      setInstallTime(formattedDate);
      return installTime;
    } catch {
      return '';
    }
  }, [installTime]);
  return (
    <View style={Style.container}>
      <CLabel style={Style.appTitle} text={translate('ABOUT_APP.APP_TITLE')} />

      <CLabel
        style={Style.info}
        text={translate('ABOUT_APP.INSTALL_DATE') + installTime}
      />
      <CLabel
        style={Style.info}
        {...getTestIdentifiers(testIds.appBuild)}
        text={translate('ABOUT_APP.VERSION') + version.split('-')[0]}
      />
    </View>
  );
};
const formatDate = (date) => {
  let newDate = dayjs(date).format(DATEFORMATS.ABOUT_VERSION);
  return newDate;
};
export default AboutVersion;
