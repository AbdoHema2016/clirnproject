import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

const styles = StyleSheet.create({
  container: {alignItems: 'flex-end'},
  label: {
    color: HEX_COLOR_CODES.BLUE1,
    paddingVertical: 15,
    paddingRight: 15,
    fontFamily: FONTS.FUTURA,
    fontSize: 16,
  },
});

export default styles;
