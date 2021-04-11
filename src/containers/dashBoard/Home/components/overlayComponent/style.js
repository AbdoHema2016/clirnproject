import {StyleSheet} from 'react-native';
import {Layout} from '../../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const style = StyleSheet.create({
  modalContainer: {
    width: 'auto',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 0,
    bottom: 0,
  },
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
  },
  dataContainer: {
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
    justifyContent: 'center',
  },
  dataView: {
    height: 419,
    alignSelf: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    marginTop: 92,
    borderRadius: 8,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  textStyle: {
    color: HEX_COLOR_CODES.WHITE,
  },
  image: {
    position: 'absolute',
    right: 0,
    height: 24,
    width: 24,
  },
  errorContainer: {
    height: '100%',
    backgroundColor: HEX_COLOR_CODES.GREY_BG,
    width: '100%',
  },
  approveRejectContainer: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  closeImage: {
    width: 30,
    height: 30,
  },
  closeBtnContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.045,
    marginTop: 18,
  },
  closeBtn: {
    width: 50,
    height: 50,
    alignSelf: 'flex-end',
  },
  popupTitle: {
    marginLeft: 20,
    width: '90%',
    fontFamily: FONTS.FUTURA,
    fontSize: 24,
    color: HEX_COLOR_CODES.DARKGRAY,
    marginTop: 10,
  },
  popupBody: {
    marginTop: 20,
    marginLeft: 20,
    width: '90%',
    fontFamily: FONTS.FUTURA,
    fontSize: 18,
    color: HEX_COLOR_CODES.GRAY,
  },
  decision: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.85,
    marginBottom: 30,
    alignSelf: 'center',
  },
  no: {
    backgroundColor: HEX_COLOR_CODES.DARKGRAY,
    height: 60,
  },
  buttonStyle: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.4,
  },
  yes: {
    height: 60,
    backgroundColor: HEX_COLOR_CODES.GREEN,
  },
  btnTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
    height: '40%',
  },
  reasonTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 18,
    color: HEX_COLOR_CODES.BLACK_BUTTON,
    height: '60%',
  },
  reason: {
    alignSelf: 'center',
    marginTop: 16,
    height: 48,
    borderRadius: 4,
    elevation: 4,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 74,
  },
  selectedReason: {
    alignSelf: 'center',
    marginTop: 16,
    height: 48,
    borderRadius: 4,
    elevation: 4,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 74,
    borderWidth: 2,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
  rejectionButtonText: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.RED,
    height: '40%',
    marginTop: 16,
    right: 24,
  },
  rejectionButtonStyle: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.4,
    backgroundColor: HEX_COLOR_CODES.WHITE,
    elevation: 0,
  },
});
export default style;
