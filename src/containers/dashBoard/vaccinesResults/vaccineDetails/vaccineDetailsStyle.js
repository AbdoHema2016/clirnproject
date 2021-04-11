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
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
  },
  title: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.15,
    flexDirection: 'row',
    marginLeft: 13,
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
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  verified: {
    marginTop: 12,
    marginLeft: 10,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.GREEN,
  },
  notVerified: {
    marginTop: 12,
    marginLeft: 10,
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.LIGHT_RED,
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
    marginLeft: 13,
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
  vaccineDetailText: {
    fontSize: 18,
    lineHeight: 32,
    height: 32,
    color: HEX_COLOR_CODES.BLACK_BUTTON,
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
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    marginTop: 20,
    fontWeight: '400',
  },
  editButton: {
    marginTop: 64,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    height: 45,
    borderRadius: 4,
    bottom: 32,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.DARKGRAY,
  },
  approveButtonText: {
    color: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
  },
  approveButton: {
    marginTop: 64,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    height: 45,
    borderRadius: 4,
    bottom: 32,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    alignSelf: 'center',
  },
  editImageStyle: {
    position: 'relative',
    right: 36,
    bottom: Platform.OS === 'ios' ? '40%' : '60%',
  },
  deleteImageStyle: {
    position: 'relative',
    right: 40,
    bottom: Platform.OS === 'ios' ? '40%' : '60%',
  },
  deleteButton: {
    marginTop: 16,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    height: 45,
    borderRadius: 4,
    bottom: 32,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: HEX_COLOR_CODES.LIGHT_RED,
  },
  deleteBtnTxt: {
    color: HEX_COLOR_CODES.LIGHT_RED,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    marginTop: 20,
    fontWeight: '400',
  },
  denyBtnTxt: {
    color: HEX_COLOR_CODES.LIGHT_RED,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
  },
  activityIndicator: {
    justifyContent: 'center',
    alignContent: 'center',
    position: 'absolute',
    top: '45%',
    left: '47%',
  },

  rejectedData: {
    marginTop: 24,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    height: 'auto',
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    paddingRight: 14,
  },
  rejectedDataInfo: {
    fontSize: 16,
    fontFamily: FONTS.ARIAL,
    marginLeft: 13,
    marginTop: 32,
    color: HEX_COLOR_CODES.BLACK,
    lineHeight: 24,
  },
  uploadNewDocument: {
    height: 52,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 35,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    alignSelf: 'center',
    marginTop: 24,
  },
  uploadButtonTextStyle: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
    height: 20,
  },
  contact: {
    fontFamily: FONTS.FUTURA,
    fontSize: 12,
    color: HEX_COLOR_CODES.GRAY,
    marginTop: 24,
    marginLeft: 13,
    marginBottom: 32,
  },
});

export default Style;
