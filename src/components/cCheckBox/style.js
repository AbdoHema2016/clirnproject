import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

const style = StyleSheet.create({
  buttonStyle: {
    marginTop: Platform.select({
      ios: 4,
      android: 8,
    }),
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.WHITE,
    borderRadius: 4,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: HEX_COLOR_CODES.RED,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  slectedbuttonImageStyle: {
    width: 18,
    height: 12,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  unslectedbuttonImageStyle: {
    width: 22,
    height: 22,
  },
  checkBoxContainerStyle: {
    height: 24,
    width: 24,
  },
});
export default style;
