import React from 'react';
import {View} from 'react-native';
import Style from './style';

function CLabelContainer(props) {
  return <View style={Style.container}>{props.children}</View>;
}

export default CLabelContainer;
