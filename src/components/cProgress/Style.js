import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';
import {initialWindowMetrics} from 'react-native-safe-area-context';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;

export default StyleSheet.create({
  loadingProgressContainer: {
    top: initialWindowMetrics?.insets?.top ?? 20,
    marginLeft: 10,
    position: 'absolute',
  },
  progressBar: {
    color: HEX_COLOR_CODES.GREEN,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 20,
  },
});
