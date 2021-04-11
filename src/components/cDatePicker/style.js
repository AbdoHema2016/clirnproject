import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS} = Layout;

const Styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  centeredView: {
    height: 264,
  },
  datePicker: {
    marginTop: 0,
    height: 220,
    bottom: 0,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  openButton: {
    width: LAYOUT_CONSTRAINTS.WINDOW_WIDTH,
    marginTop: LAYOUT_CONSTRAINTS.WINDOW_HEIGHT - 264,
    backgroundColor: 'grey',
    height: 44,
    elevation: 2,
    justifyContent: 'center',
  },
  textStyle: {
    color: HEX_COLOR_CODES.GREEN,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 24,
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Styles;
