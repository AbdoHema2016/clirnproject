import {StyleSheet} from 'react-native';
import {Layout, LAYOUT_CONSTRAINTS} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFill,
    height: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: HEX_COLOR_CODES.BLACK_1,
  },
  activityIndicatorWrapper: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default styles;
