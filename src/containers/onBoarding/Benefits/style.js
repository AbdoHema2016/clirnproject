import {StyleSheet} from 'react-native';
import {Layout} from '../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES} = Layout;

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainers: {
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT,
  },
  selectedDotStyle: {
    bottom:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.29
        : 180,
    height: 16,
    width: 16,
    borderRadius: 12,
    backgroundColor: HEX_COLOR_CODES.GREEN_BLUE,
  },
  unSelectedDotStyle: {
    bottom:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 700
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.29
        : 180,
    height: 16,
    width: 16,
    borderRadius: 12,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  blackButton: {
    backgroundColor: HEX_COLOR_CODES.BLACK_BUTTON,
  },
  buttonsContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 800
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.109
        : 32,
    justifyContent: 'space-between',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH - 28,
    height: 116,
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
});

export default style;
