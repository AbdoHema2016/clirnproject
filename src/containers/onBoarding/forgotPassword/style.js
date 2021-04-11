import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  navTitle: {
    fontSize: 20,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  innerContainer: {
    alignItems: 'center',
  },
  appTitleContainer: {
    flexDirection: 'row',
    marginTop:
      LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.227
        : 120,
    width: 'auto',
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '600',
    marginLeft: 20.32,
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  aboutAppLabelContainer: {
    marginTop: 32,
    width: 'auto',
  },
  aboutAppLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    textAlign: 'center',
    width: 220,
  },
  inputContainer: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 24,
    marginTop: 68,
    height: 'auto',
  },
  inputLabel: {
    height: 16,
    marginTop: 16,
    fontSize: 12,
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.12
        : 80,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 'auto',
  },
  blackButton: {
    backgroundColor: HEX_COLOR_CODES.BLACK_BUTTON,
  },
  whiteButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 16,
  },
  whiteText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  blackText: {
    color: HEX_COLOR_CODES.BLACK,
  },
  emailSent: {
    color: HEX_COLOR_CODES.GREEN,
    marginTop: 8,
    fontSize: 12,
  },
  blurredTextInput: {color: HEX_COLOR_CODES.GRAY},
});

export default Style;
