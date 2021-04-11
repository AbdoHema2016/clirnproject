import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  buttonImageStyle: {
    position: 'absolute',
    height: 9,
    width: 18,
    right: 18,
  },
  innerContainer: {
    justifyContent: 'space-around',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 26,
  },
  dataContainer: {
    flex: 1,
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
    width: 324,
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
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 24,
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
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    marginTop: 68,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blackButton: {
    backgroundColor: HEX_COLOR_CODES.BLACK_BUTTON,
    marginTop: 58,
    position: 'absolute',
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.119,
  },
  whiteButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  greenButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN_BLUE,
  },
  whiteText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  blackText: {
    color: HEX_COLOR_CODES.BLACK,
  },
  privacyPolicyContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  errorLabel: {
    marginLeft: 16,
    width: 300,
    fontSize: 16,
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  noErrorLabel: {
    marginLeft: 16,
    width: 240,
    fontSize: 16,
    color: HEX_COLOR_CODES.GREEN,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  didnotReceiveOtpButton: {
    position: 'absolute',
    height: 30,
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.119 + 124,
  },
  didnotReceiveOtpText: {
    fontSize: 17,
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.GREEN_BLUE,
    textAlign: 'center',
  },
  errorMessageView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginLeft: 0,
  },
  statusIcon: {
    alignSelf: 'flex-start',
    height: 24,
    width: 24,
  },
});

export default Style;
