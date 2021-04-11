import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

const style = StyleSheet.create({
  link: {
    color: HEX_COLOR_CODES.BLUE,
    textDecorationLine: 'underline',
  },
});

export default style;
