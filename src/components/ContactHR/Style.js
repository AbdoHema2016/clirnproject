import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    height: 260,
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
  info: {
    marginTop: 10,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH * 0.8,
  },
  title: {
    color: HEX_COLOR_CODES.BLACK,
    fontFamily: FONTS.FUTURA,
    fontWeight: '500',
    fontSize: 24,
  },
  body: {
    marginTop: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT * 0.018,
    alignSelf: 'stretch',
    color: HEX_COLOR_CODES.GRAY,
    fontFamily: FONTS.ARIAL,
    fontWeight: '400',
    fontSize: 16,
  },

  closeContainer: {
    position: 'absolute',
    bottom: 30,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    height: 60,
    width: '85%',
  },
  closeTxt: {
    fontFamily: FONTS.FUTURA,
    color: HEX_COLOR_CODES.WHITE,
    fontWeight: '500',
    fontSize: 16,
    height: 23,
  },
});

export default Style;
