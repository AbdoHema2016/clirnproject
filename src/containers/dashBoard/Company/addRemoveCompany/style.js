import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
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
  msgs: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.8,
  },
  topMsg: {
    marginTop: 12,
  },
  companyName: {
    color: HEX_COLOR_CODES.GREEN_BLUE,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 24,
  },
  RemoveCompanyName: {
    color: HEX_COLOR_CODES.GREEN_BLUE,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 18,
  },
  removeBody: {
    marginTop: 26,
    marginBottom: 36,
  },
  addMsg: {
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 24,
  },
  confirmMsg: {
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.027,
    alignSelf: 'stretch',
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 18,
  },
  descision: {
    marginTop: 39,
    bottom: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.85,
  },
  rejectContainer: {
    backgroundColor: HEX_COLOR_CODES.BLACK_BUTTON,
    height: 60,
  },
  acceptContainer: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    height: 60,
  },
  buttonStyle: {
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.4,
  },
  descisionTxt: {
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.WHITE,
    fontWeight: '500',
    fontSize: 16,
    height: 23,
  },
});

export default Style;
