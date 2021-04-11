import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    height: 430,
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: HEX_COLOR_CODES.WHITE,
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
  meTxt: {
    fontFamily: FONTS.ARIAL,
    fontSize: 19,
    color: HEX_COLOR_CODES.GREEN,
    fontWeight: 'bold',
  },
  cButtonContainerStyle: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 56,
    alignSelf: 'center',
    position: 'absolute',
    bottom: '8%',
  },
  btnTxt: {
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
    height: '40%',
  },
});
export default Style;
