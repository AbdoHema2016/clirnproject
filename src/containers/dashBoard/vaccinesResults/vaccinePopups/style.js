import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
    backgroundColor: HEX_COLOR_CODES.MODAL_BG,
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
  dataContainer: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
    justifyContent: 'center',
  },
  subDataContainer: {
    height:
      LAYOUT_CONSTRAINTS.SCREEN_HEIGHT > 800
        ? LAYOUT_CONSTRAINTS.SCREEN_HEIGHT - 264
        : LAYOUT_CONSTRAINTS.SCREEN_HEIGHT - 120,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    alignSelf: 'center',
    backgroundColor: HEX_COLOR_CODES.GREY_BG,
    borderRadius: 8,
  },
  remiderPopupContainer: {
    backgroundColor: 'white',
    height: 450,
    top: '25%',
    width: '92%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: '5%',
    paddingTop: '5%',
  },
  closeBtnContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.045,
    marginTop: 8,
  },
  closeBtn: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  closeImage: {
    width: 24,
    height: 24,
  },
  popupIcon: {
    width: 97,
    height: 97,
    alignSelf: 'center',
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
  buttonStyle: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.4,
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
  goToVaccineDetails: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '8%',
  },
});
export default Style;
