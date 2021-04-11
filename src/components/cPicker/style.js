import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.TRANSPARENT_BG,
  },
  centeredView: {
    height: 198,
  },
  iosPicker: {
    marginTop: 0,
    height: 150,
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  androidPicker: {
    borderRadius: 4,
    flexDirection: 'row',
    height: 46,
    marginLeft: 12,
    width: '90%',
    fontFamily: FONTS.SOFIA_REGULAR,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  doneButton: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT - 198,
    backgroundColor: 'grey',
    height: 44,
    justifyContent: 'center',
  },
  textStyle: {
    color: HEX_COLOR_CODES.GREEN,
    padding: 0,
    height: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    fontFamily: FONTS.SOFIA_REGULAR,
    marginRight: 24,
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  androidPickerContainer: {
    borderRadius: 4,
    flexDirection: 'row',
    height: 48,
    marginTop: 4,
    alignItems: 'center',
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  errorStyle: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.RED,
  },
  active: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GRAY,
  },
  focused: {
    borderWidth: 1.0,
    borderColor: HEX_COLOR_CODES.GREEN,
  },
});

export default styles;
