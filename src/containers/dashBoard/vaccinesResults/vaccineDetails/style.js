import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  scrollView: {
    marginTop: 64,
  },
  borderStyle: {
    borderColor: HEX_COLOR_CODES.GRAY,
    borderWidth: 2.0,
    borderRadius: 4,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  innerContainer: {
    height: '100%',
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
    marginTop: 56,
    marginLeft: 13,
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
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    marginTop: 16,
    height: 'auto',
    paddingBottom: 16,
    justifyContent: 'center',
  },
  inputInnerContainer: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    marginLeft: 13,
  },
  inputLabel: {
    height: 16,
    marginTop: 16,
    fontSize: 12,
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  inputLabelOnDataFilled: {
    marginLeft: 20,
    height: 16,
    marginTop: 16,
    fontSize: 12,
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  testCentreLableTopOnDataFilled: {
    marginTop: 44,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.119,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 100,
    justifyContent: 'space-between',
  },
  buttonContainerStyle: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
  },
  addDocsButton: {
    marginTop: 23,
    alignSelf: 'center',
    backgroundColor: HEX_COLOR_CODES.GRAY,
    height: 40,
    width: 167,
    borderRadius: 4,
    marginBottom: 16,
  },
  greenButton: {
    marginTop: 35,
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  greenButtonInModal: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 56,
  },
  whiteButton: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    marginTop: 16,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    alignSelf: 'center',
    shadowColor: HEX_COLOR_CODES.GRAY,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  backButtonView: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
  },
  whiteText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  plusText: {
    fontSize: 32,
    color: HEX_COLOR_CODES.WHITE,
    height: 36,
    marginTop: 4,
    width: 34,
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
    alignSelf: 'center',
    right: 3,
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
  uploadButtonContainer: {
    marginTop: 8,
    borderStyle: 'dotted',
    borderWidth: 1.0,
    justifyContent: 'center',
  },
  uploadButtonContainerWidthOnDataFilled: {
    alignItems: 'center',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 60,
    borderStyle: 'dotted',
    borderWidth: 1.0,
    alignSelf: 'center',
    right: 13,
  },
  uploadButton: {
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    width: 'auto',
    alignSelf: 'center',
  },
  uploadButtonOnDataFilled: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  uploadButtonTitle: {
    color: HEX_COLOR_CODES.BLACK,
    textAlign: 'center',
    fontSize: 18,
    alignSelf: 'center',
    maxWidth: '75%',
  },
  uploadButtonIcon: {
    position: 'relative',
    marginLeft: 32,
  },
  buttonContainerStyleOnDataFilled: {
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 64,
  },
  crossButtonContainer: {
    height: 32,
    width: 32,
    position: 'absolute',
    right: 24,
    top: 0,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: HEX_COLOR_CODES.GREY_BG,
  },
  crsossButton: {
    height: 24,
    width: 24,
  },
  customeImageStyle: {
    height: 24,
    width: 24,
    right: 0,
    position: 'relative',
  },
  textStyle: {
    height: 0,
    width: 0,
  },
  skip: {
    marginTop: 24,
    textAlign: 'center',
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 16,
    color: HEX_COLOR_CODES.BLACK,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
  },
  errorStyle: {
    height: '100%',
    backgroundColor: HEX_COLOR_CODES.GREY_BG,
    width: '100%',
  },
  reminderSwitchView: {
    height: 80,
    marginTop: 16,
    flexDirection: 'row',
  },
  notificationLabelView: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 84,
  },
  notificationLabel: {
    fontSize: 12,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.BLACK,
  },
  reminderLabel: {
    fontSize: 16,
    fontFamily: FONTS.ARIAL,
    marginTop: 8,
    color: HEX_COLOR_CODES.BLACK,
  },
});

export default Style;
