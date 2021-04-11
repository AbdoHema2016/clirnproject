import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Styles from './style';
import {Layout, testIds} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

const CLoader = ({
  loading,
  color = HEX_COLOR_CODES.GREEN_2,
  loaderContainerStyle,
}) => {
  if (!loading) {
    return null;
  }
  return (
    <View style={Styles.modalBackground}>
      <View style={[Styles.activityIndicatorWrapper, loaderContainerStyle]}>
        <ActivityIndicator
          testID={testIds.loader}
          accessibilityLabel={testIds.loader}
          size={'large'}
          color={color}
        />
      </View>
    </View>
  );
};

export default CLoader;
