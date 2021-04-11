import React from 'react';
import {View} from 'react-native';
import CLabel from '../../../../components/cLabel';
import CImage from '../../../../components/cImage';
import {LOCAL_PATH, URLS} from '../../../../utilities';
import {translate} from '../../../../Localization';

import Style from './style';
const noCompany = () => {
  return (
    <View style={Style.container}>
      <CLabel style={Style.appTitle} text={translate('COMPANY.NO_COMPANY')} />
      <CLabel
        style={Style.subTitle}
        text={translate('COMPANY.NO_COMPANY_SUB_TITLE')}
      />
      <CImage imageStyle={Style.imageStyle} imagePath={LOCAL_PATH.NO_COMPANY} />
      <CLabel
        link={translate('COMPANY.WEBSITE_LINK')}
        url={URLS.TESTED_ME_BUSINESS}
        style={Style.findAbout}
        text={translate('COMPANY.FIND_ABOUT')}
      />
    </View>
  );
};

export default noCompany;
