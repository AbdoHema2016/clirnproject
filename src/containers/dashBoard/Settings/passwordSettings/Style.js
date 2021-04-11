import {StyleSheet} from 'react-native';
import style from '../../Settings/editPersonalAndContactDetails/style';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  ...style,
  passwordbuttonsContainer: {
    position: 'absolute',
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.118,
  },
  forgotPasswordButton: {
    alignSelf: 'center',
    bottom: 44,
  },
  forgotPasswordLabel: {
    color: HEX_COLOR_CODES.GREEN,
    fontSize: 18,
    height: 20,
    bottom: 44,
    alignSelf: 'center',
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  loginViaFaceIDView: {
    marginTop: 28,
    flexDirection: 'row',
  },
  loginViaFaceIDLabel: {
    fontSize: 14,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
  },
  switch: {
    position: 'absolute',
    right: 0,
    top: -8,
  },
});

export default Style;
