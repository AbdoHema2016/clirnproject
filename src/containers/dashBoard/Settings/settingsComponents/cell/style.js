import {StyleSheet} from 'react-native';

import {Layout} from '../../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const Style = StyleSheet.create({
  cellCotainer: {
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.09,
    justifyContent: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    height: 'auto',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'left',
    marginLeft: 14,
    color: HEX_COLOR_CODES.BLACK,
  },
  redTitle: {
    color: HEX_COLOR_CODES.RED,
  },
  greenTitle: {
    color: HEX_COLOR_CODES.GREEN,
  },
  goIcon: {
    position: 'absolute',
    right: 28,
    height: 14,
    width: 9,
  },
  underLine: {
    position: 'absolute',
    bottom: 1,
    height: 1,
    backgroundColor: HEX_COLOR_CODES.UNDERLINE,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 28,
    alignSelf: 'center',
  },
});

export default Style;
