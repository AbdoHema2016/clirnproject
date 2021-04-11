import {StyleSheet, Platform} from 'react-native';
import {Layout} from '../../utilities';

const {FONTS} = Layout;
export const Style = StyleSheet.create({
  container: {
    width: 120,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  backButton: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  backButtonImage: {
    marginLeft: 16,
    width: 8,
    height: 13,
  },
  backButtonTitle: {
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 18,
    marginLeft: 8,
    paddingTop: Platform.OS === 'android' ? 0 : 8,
    paddingBottom: Platform.OS === 'android' ? 4 : 0,
  },
});
