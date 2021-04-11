import {StyleSheet} from 'react-native';
import {HEX_COLOR_CODES} from '../../utilities';
const Style = StyleSheet.create({
  zoom: {
    position: 'absolute',
    right: 16,
    top: 64,
    height: 24,
    width: 24,
    backgroundColor: HEX_COLOR_CODES.GREEN_BLUE,
  },
  zoomImage: {
    position: 'absolute',
    height: 24,
    width: 24,
    top: 0,
    left: 0,
  },
  zoomButton: {
    height: 24,
    width: 24,
  },
});

export default Style;
