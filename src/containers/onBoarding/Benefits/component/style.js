import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {LAYOUT_CONSTRAINTS, HEX_COLOR_CODES, FONTS} = Layout;

const style = StyleSheet.create({
  container: {
    height: '100%',
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    marginTop:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 800
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.27 +
          LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.2
        : 264,
    height: 120,
    width: 120,
    alignSelf: 'center',
  },
  mainTitle: {
    marginTop:
      LAYOUT_CONSTRAINTS.WINDOW_HEIGHT > 800
        ? LAYOUT_CONSTRAINTS.WINDOW_HEIGHT * 0.27
        : 120,
    fontFamily: FONTS.SOFIA_REGULAR,
    textAlign: 'center',
    fontSize: 24,
  },
  subTitle: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 18,
    width: 288,
    alignSelf: 'center',
    fontFamily: FONTS.SOFIA_REGULAR,
    color: HEX_COLOR_CODES.GRAY,
  },
});

export default style;
