import {Platform, Dimensions} from 'react-native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
const {width: screenWidth, height: screenHeight} = Dimensions.get('screen');

export const layout = {
  size: {width: windowWidth, height: windowHeight},
  isiOS: Platform.OS === 'ios',
};

export const LAYOUT_CONSTRAINTS = {
  SCREEN_WIDTH: screenWidth,
  SCREEN_HEIGHT: screenHeight,
  WINDOW_WIDTH: windowWidth,
  WINDOW_HEIGHT: windowHeight,
};
