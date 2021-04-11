import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    paddingLeft: 14,
    paddingRight: 14,
  },
  appTitle: {
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.13,
    fontSize: 24,
    fontWeight: '600',
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  txtTriggerMedicalApproval: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.DARKGRAY,
    marginTop: '12%',
    lineHeight: 24,
    fontWeight: '400',
  },
  btnBecomeVerifier: {
    marginTop: '12%',
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  txtVerifyIdentity: {
    marginTop: '12%',
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  btnVerifyIdentity: {
    marginTop: '12%',
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  txtBtnVerifyIdentity: {
    color: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  txtBtnBecomeVerifier: {
    color: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  txtContainerRole: {
    marginTop: '12%',
  },
  txtRole: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.DARKGRAY,
    lineHeight: 24,
    fontWeight: '400',
  },
  txtTestedMe: {
    fontFamily: FONTS.ARIAL,
    fontSize: 16,
    color: HEX_COLOR_CODES.GREEN,
    lineHeight: 24,
    fontWeight: '700',
  },
  txtChooseRole: {
    marginTop: '20%',
    fontFamily: FONTS.FUTURA,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: HEX_COLOR_CODES.DARKGRAY,
  },
  btnLocation: {
    marginTop: '8%',
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  btnLocationChosen: {
    marginTop: '8%',
    backgroundColor: HEX_COLOR_CODES.WHITE,
    borderColor: HEX_COLOR_CODES.GREEN,
    borderWidth: 1,
  },
  txtBtnLocation: {
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  containerTermsContainer: {
    marginTop: '12%',
    flexDirection: 'row',
  },
  txtAgree: {
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  txtTermsConditions: {
    color: HEX_COLOR_CODES.BLUE,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  containerTxtAgree: {
    marginTop: 3,
    marginLeft: 16,
  },
  btnConfirmDisabled: {
    marginTop: '12%',
    backgroundColor: HEX_COLOR_CODES.MID_GRAY,
  },
  btnConfirmEnabled: {
    marginTop: '12%',
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  txtBtnConfirm: {
    color: HEX_COLOR_CODES.WHITE,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  containerTxtCongrats: {
    marginTop: '12%',
  },
  txtCongrats: {
    marginTop: '12%',
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  imgCongrats: {
    marginTop: '12%',
    alignSelf: 'center',
    width: 128,
    height: 128,
  },
  medicalProfessionalTitle: {
    marginTop: '12%',
    fontFamily: FONTS.ARIAL,
    fontSize: 12,
    fontWeight: '400',
  },
  inputTextsupreContainerStyle: {
    backgroundColor: HEX_COLOR_CODES.LIGHT_GREY,
  },
  errorMsgContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  errorImageStyle: {
    marginRight: 4,
    width: 20,
    height: 20,
  },
  dropDownTextStyle: {
    position: 'absolute',
    left: 13,
    fontSize: 18,
    color: HEX_COLOR_CODES.GRAY,
  },
  dropDownSelectedTextStyle: {
    position: 'absolute',
    left: 13,
    fontSize: 18,
    color: HEX_COLOR_CODES.BLACK,
  },
  selectReason: {
    marginTop: 10,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
  binButton: {
    width: '100%',
    height: '100%',
  },
  dropDown: {
    marginLeft: 13,
  },
  androidDropDown: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 34,
    height: '100%',
    marginLeft: 8,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
});
