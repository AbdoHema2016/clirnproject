import {StyleSheet} from 'react-native';
import {FONTS, Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;

const style = StyleSheet.create({
  errContainer: {
    height: '100%',
    backgroundColor: HEX_COLOR_CODES.LIGHT_WHITE,
    alignItems: 'center',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
  },
  topErrContent: {
    flex: 1,
    top: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.15,
    alignItems: 'center',
  },
  oops: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: HEX_COLOR_CODES.DARKGRAY,
    fontFamily: FONTS.FUTURA,
    marginBottom: '5%',
  },
  msgContainer: {
    textAlign: 'center',
    marginHorizontal: '10%',
  },
  errTxt: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.ARIAL,
  },
  MeTxt: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    color: HEX_COLOR_CODES.GREEN,
    fontFamily: FONTS.ARIAL,
  },
  contactSupport: {
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: HEX_COLOR_CODES.BLUE,
    fontFamily: FONTS.ARIAL,
    textDecorationLine: 'underline',
  },
  errImg: {
    marginBottom: '8%',
  },
  bottomErrContent: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  tryAgainBtn: {
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.09,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.9,
    height: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.15,
    justifyContent: 'center',
    borderRadius: 4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  cancelBtn: {
    bottom: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.07,
    borderColor: HEX_COLOR_CODES.GREEN,
    borderWidth: 1,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.9,
    height: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.15,
    justifyContent: 'center',
    borderRadius: 4,
  },
  tryAgainTxt: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: HEX_COLOR_CODES.WHITE,
  },
  cancelTxt: {
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    color: HEX_COLOR_CODES.GREEN,
  },
});
export default style;
