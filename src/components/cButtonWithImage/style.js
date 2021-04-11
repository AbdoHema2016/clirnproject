import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const style = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
  },
  buttonTextStyle: {
    fontSize: 17,
    textAlign: 'left',
    maxWidth: 180,
    color: HEX_COLOR_CODES.GRAY,
    height: Platform.OS === 'ios' ? 18 : 28,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  buttonImageStyle: {
    position: 'absolute',
    height: 18,
    width: 18,
    right: 18,
  },
  cButtonContainerStyle: {
    shadowColor: HEX_COLOR_CODES.MODAL_BLANK,
    height: '100%',
    width: '100%',
  },
  buttonContainerStyle: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    borderRadius: 4,
    flexDirection: 'row',
    height: 48,
  },
  error: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.RED,
  },
  active: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GRAY,
  },
  focused: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  loaderView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});
export default style;
