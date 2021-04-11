import React from 'react';
import {View} from 'react-native';
export const IndicatorViewPager = ({children}) => {
  return <View>{children}</View>;
};
export const PagerDotIndicator = (ref) => ref;
export default {
  IndicatorViewPager,
  PagerDotIndicator,
};
