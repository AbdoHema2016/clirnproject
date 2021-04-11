import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES} = Layout;

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  optionsList: {paddingBottom: 40},
});
