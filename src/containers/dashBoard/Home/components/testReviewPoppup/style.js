import {StyleSheet} from 'react-native';
import {Layout} from '../../../../../utilities';

const {HEX_COLOR_CODES, FONTS, LAYOUT_CONSTRAINTS} = Layout;

const Style = StyleSheet.create({
  reviewPopupContainer: {
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
  testVerifiedImg: {
    width: 96,
    height: 96,
  },
  verifyTitleTxt: {
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.DARKGRAY,
    fontSize: 24,
    fontWeight: '400',
    width: '85%',
    marginTop: '10%',
  },
  verifyBodyContainerTxt: {
    width: '85%',
    marginLeft: 24,
    marginRight: 24,
    marginTop: 20,
    lineHeight: 24,
  },
  verifyBodyTxt: {
    fontFamily: FONTS.ARIAL,
    color: HEX_COLOR_CODES.GRAY,
    fontSize: 16,
    fontWeight: '400',
    // width:'100%',
  },
  verifyBodyTestTxt: {
    fontFamily: FONTS.ARIAL,
    color: HEX_COLOR_CODES.GREEN,
    fontSize: 16,
    fontWeight: '700',
  },
  seeDetailsBtn: {
    marginTop: 30,

    marginBottom: 20,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    width: '85%',
  },
  seeDetailsBtnTxt: {
    color: HEX_COLOR_CODES.WHITE,
    fontSize: 16,
    fontFamily: FONTS.FUTURA,
    fontWeight: '400',
  },
});
export default Style;
