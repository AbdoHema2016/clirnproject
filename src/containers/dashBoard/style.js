import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES} = Layout;

export const Style = StyleSheet.create({
  tabIcon: {
    height: 20,
    width: 20,
    marginTop: 8,
  },
  tabIconContainer: {
    height: 24,
    width: 24,
    alignItems: 'center',
  },
  selectedTabTitleColor: {
    color: HEX_COLOR_CODES.GREEN,
  },
  unSelectedTabTitleColor: {
    color: HEX_COLOR_CODES.BLACK,
  },
  headerTitleGrey: {
    color: HEX_COLOR_CODES.GRAY,
  },
});
