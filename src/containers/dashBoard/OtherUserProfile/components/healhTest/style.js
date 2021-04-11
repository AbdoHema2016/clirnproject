import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../../../../utilities';

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
    color: HEX_COLOR_CODES.GRAY,
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
  healthTestDetailText: {
    fontSize: 18,
    lineHeight: 32,
    height: 32,
    color: HEX_COLOR_CODES.BLACK_BUTTON,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  nagtiveHealhTestResultColor: {
    color: HEX_COLOR_CODES.GREEN,
  },
  positiveHealhTestResultColor: {
    color: HEX_COLOR_CODES.RED,
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
  flexRow: {flexDirection: 'row'},

  reminderSwitchView: {
    height: 60,
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
    color: HEX_COLOR_CODES.BLACK_BUTTON,
  },
  testImageView: {
    height: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 40,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    borderRadius: 4,
  },
  testImage: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
  },
  zoom: {
    position: 'absolute',
    right: 16,
    top: 16,
    height: 24,
    width: 24,
    backgroundColor: HEX_COLOR_CODES.GREEN_BLUE,
  },
  zoomImage: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: 0,
    left: 0,
  },
  zoomButton: {
    height: 24,
    width: 24,
  },
  editButtonText: {
    color: HEX_COLOR_CODES.WHITE,
    marginTop: 20,
  },
  editButton: {
    marginTop: 64,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    height: 40,
    borderRadius: 4,
    bottom: 32,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.DARKGRAY,
  },
  editImageStyle: {
    position: 'relative',
    right: 36,
    bottom: Platform.OS === 'ios' ? 20 : 24,
  },
  deleteImageStyle: {
    position: 'relative',
    right: 40,
    bottom: Platform.OS === 'ios' ? 20 : 24,
  },
  deleteButton: {
    marginTop: 16,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    height: 40,
    borderRadius: 4,
    bottom: 32,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.RED,
  },
  modalContainer: {
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
    flex: 1,
  },
  popupContainer: {
    backgroundColor: 'white',
    height: 250,
    top: '35%',
    width: '92%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: '5%',
  },
  popupTitle: {
    marginTop: '10%',
    width: '90%',
    fontFamily: FONTS.FUTURA,
    fontSize: 24,
    color: HEX_COLOR_CODES.DARKGRAY,
  },
  popupBody: {
    marginTop: '5%',
    width: '90%',
    fontFamily: FONTS.ARIAL,
    fontSize: 19,
    color: HEX_COLOR_CODES.GRAY,
  },
  vaccineTxt: {
    fontFamily: FONTS.ARIAL,
    fontSize: 19,
    color: HEX_COLOR_CODES.GREEN,
    fontWeight: 'bold',
  },
  descision: {
    marginTop: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.85,
  },
  cancelBtnContainer: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    height: 60,
  },
  removeBtnContainer: {
    height: 60,
  },
  btnTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
    height: '40%',
  },
  removeBtnTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.RED,
    height: '40%',
  },
  buttonStyle: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.4,
  },
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
    backgroundColor: HEX_COLOR_CODES.MODAL_BG,
  },
  activityIndicator: {
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: '45%',
    left: '47%',
  },
});

export default Style;
