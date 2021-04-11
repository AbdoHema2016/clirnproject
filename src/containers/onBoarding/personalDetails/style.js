import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  keyboardVerticalOffset: {
    top: Platform.OS === 'android' ? 44 : 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    justifyContent: 'space-around',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 26,
  },
  appTitleContainer: {
    flexDirection: 'row',
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.227,
    width: 'auto',
    alignItems: 'center',
  },
  logo: {
    height: 41,
    width: 43,
  },
  infoStageLabel: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.12,
    fontSize: 16,
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '600',
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
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    marginTop: 24,
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
    marginTop:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.163
        : 40,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 118,
    justifyContent: 'space-between',
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
  trackColorWhenFalse: {
    color: HEX_COLOR_CODES.TRACK_FALSE,
  },
  trackColorWhenTrue: {
    color: HEX_COLOR_CODES.TRACK_TRUE,
  },
  switchStyle: {
    position: 'absolute',
    right: 3,
    top: 12,
  },
  thumbColorWhenEnabled: {
    color: HEX_COLOR_CODES.THUMB_ENABLED,
  },
  thumbColorWhenDisEnabled: {
    color: HEX_COLOR_CODES.THUMB_DISABLED,
  },
  locationLabel: {
    marginTop: 16,
    fontSize: 14,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.BLACK,
  },
  titleNillColor: {
    color: HEX_COLOR_CODES.GRAY,
    position: 'absolute',
    left: 16,
  },
  titleSelectedColor: {
    color: HEX_COLOR_CODES.BLACK,
    position: 'absolute',
    left: 16,
  },
  locationSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
});

export default Style;
