import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const style = StyleSheet.create({
  countryPickerContainer: {
    width: 'auto',
    justifyContent: 'center',
    position: 'absolute',
    marginTop: 44,
    bottom: 0,
  },
  cellContainer: {
    justifyContent: 'center',
  },
  cell: {
    height: 50,
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.8,
    borderBottomColor: HEX_COLOR_CODES.GRAY,
  },
  cellLabel: {
    position: 'absolute',
    fontSize: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
    padding: 16,
    right: 4,
  },
  countryNameLabel: {
    fontSize: 16,
    fontFamily: FONTS.SOFIA_REGULAR,
    padding: 16,
  },
  modal: {
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT,
  },
  list: {
    marginTop: 0,
    height: LAYOUT_CONSTRAINTS.SCREEN_HEIGHT - 88,
    backgroundColor: HEX_COLOR_CODES.LIGHT_GRAY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  blackButton: {
    backgroundColor: HEX_COLOR_CODES.BLACK,
    marginTop: 80,
    alignSelf: 'center',
  },
  textStyle: {
    color: HEX_COLOR_CODES.WHITE,
  },
  flatlistContainer: {
    backgroundColor: HEX_COLOR_CODES.TRANSPARENT_BG,
  },
  image: {
    position: 'absolute',
    right: 0,
    height: 24,
    width: 24,
  },
  closeButton: {height: 80, width: 'auto'},
});
export default style;
