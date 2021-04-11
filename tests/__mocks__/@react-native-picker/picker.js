import React from 'react';
import {View} from 'react-native';

export const Picker = ({children}) => <View>{children}</View>;

Picker.Item = ({value}) => <View>{value}</View>;

export default {
  Picker,
};
