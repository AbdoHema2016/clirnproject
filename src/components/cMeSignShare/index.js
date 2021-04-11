import React, {PureComponent} from 'react';
import {Alert} from 'react-native';
import {HelperFunctions} from '../../utilities';
import {translate} from '../../Localization';

const {errorReportLogger} = HelperFunctions;
import {testIds} from '../../utilities';
import {Style} from './style';

class CMeSignShare extends PureComponent {
  onError = (error) => {
    errorReportLogger(error);

    Alert.alert(error);
  };

  render() {
    return (
      <></>
    );
  }
}

export default CMeSignShare;
