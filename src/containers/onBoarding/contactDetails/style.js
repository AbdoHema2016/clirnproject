import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  keyboardVerticalOffset: {
    top: Platform.OS === 'android' ? 44 : 0,
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
  privacyPolicyContainer: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 'auto',
  },
  IAgreeLabel: {
    marginLeft: 16,
    lineHeight: 20,
    fontSize: 12,
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  IAgreeUncheckedLabel: {
    marginLeft: 16,
    lineHeight: 20,
    fontSize: 12,
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  privacyPolicyBtn: {
    marginLeft: -13,
  },
  privacyPolicyChecked: {
    marginLeft: 16,
    lineHeight: 20,
    fontSize: 12,
    color: HEX_COLOR_CODES.GREEN,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  privacyPolicyUnchecked: {
    marginLeft: 16,
    lineHeight: 20,
    fontSize: 12,
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  privacyPolicyTxt: {
    fontFamily: FONTS.SOFIA_BOLD,
  },
  TermsCondsTxt: {
    fontFamily: FONTS.SOFIA_BOLD,
    marginLeft: 0,
  },
  termsAndConditionsContainer: {marginLeft: 40, flexDirection: 'row'},
});

export default Style;
