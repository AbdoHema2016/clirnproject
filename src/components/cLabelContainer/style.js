import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

const Style = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
  },
});

export default Style;
