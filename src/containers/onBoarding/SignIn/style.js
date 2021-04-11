import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, FONTS, HEX_COLOR_CODES} = Layout;

const Style = StyleSheet.create({
  keyboardAvoidingView: {
    height:
      LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800
        ? Platform.OS === 'ios'
          ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT -
            (LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.22 + 80)
          : LAYOUT_CONSTRAINTS.SCREEN_HEIGHT -
            (LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.22 + 160)
        : LAYOUT_CONSTRAINTS.SCREEN_HEIGHT - 240,
  },
  keyboardVerticalOffset: {
    top: Platform.OS === 'android' ? 44 : 80,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  innerContainer: {
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  forgotenPasswordLink: {
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 12,
    marginRight: 8,
    marginTop: 8,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
  Biometric: {
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 12,
    marginRight: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  appTitleContainer: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop:
          LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800
            ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.19
            : LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.14,
      },
      android: {
        marginTop:
          LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800
            ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.17
            : LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.09,
      },
    }),
    width: 'auto',
    alignItems: 'center',
  },
  logo: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    height: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.3,
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
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800 ? 44 : 8,
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
    ...Platform.select({
      ios: {
        bottom: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.12,
      },
      android: {
        bottom: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.11,
      },
    }),
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 124,
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
});

export default Style;
