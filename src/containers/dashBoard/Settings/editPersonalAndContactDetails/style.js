import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, FONTS, LAYOUT_CONSTRAINTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  keyboardVerticalOffset: {
    top: Platform.OS === 'android' ? 44 : 0,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainerStyle: {paddingBottom: 40},
  tintStyle: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  backButtonStyle: {
    color: HEX_COLOR_CODES.GRAY,
  },
  greyBackgroundColor: {
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
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
  contactDetailsTitle: {
    marginTop: 44,
    marginBottom: 8,
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
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.15,
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
    marginTop: 20,
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
    marginTop: 44,
    bottom: 8,
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
  switchStyle: {
    position: 'absolute',
    right: 3,
    top: 12,
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
  personalDetailText: {
    marginLeft: 18,
    fontSize: 18,
    lineHeight: 40,
    height: 40,
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  inputTextStyle: {
    borderRadius: 4,
    marginTop: 4,
    flexDirection: 'row',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  inputTextsupreContainerStyle: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  editButton: {
    marginTop: 52,
    marginLeft: 16,
    height: 24,
    width: 36,
    justifyContent: 'center',
    alignContent: 'center',
  },
  imgEditButton: {
    height: 24,
    width: 36,
  },
  flexRow: {flexDirection: 'row'},
});

export default Style;
