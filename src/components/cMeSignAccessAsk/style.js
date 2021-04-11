import {StyleSheet} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, LAYOUT_CONSTRAINTS, FONTS} = Layout;

const Style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: HEX_COLOR_CODES.WALKTHROUGH_BG,
  },
  modalView: {
    height: 349,
    borderRadius: 4,
    alignSelf: 'center',
    marginLeft: 13,
    marginRight: 13,
    backgroundColor: HEX_COLOR_CODES.WHITE,
  },
  askingUserName: {
    color: HEX_COLOR_CODES.GREEN,
  },
  text: {
    fontSize: 24,
    fontFamily: FONTS.SOFIA_MEDIUM,
    color: HEX_COLOR_CODES.BLACK,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 48,
  },
  description: {
    color: HEX_COLOR_CODES.GRAY,
    fontSize: 18,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 22,
    fontFamily: FONTS.SOFIA_MEDIUM,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 40,
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 26,
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  rejectButton: {
    flex: 1,
    borderRadius: 4,
    height: 50,
    backgroundColor: HEX_COLOR_CODES.DARKGRAY,
    marginRight: 10,
  },
  acceptButton: {
    flex: 1,
    borderRadius: 4,
    height: 50,
    backgroundColor: HEX_COLOR_CODES.GREEN,
    marginLeft: 10,
  },
  buttonText: {
    color: HEX_COLOR_CODES.WHITE,
  },
  buttonCustomStyle: {
    width: '100%',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    width: LAYOUT_CONSTRAINTS.SCREEN_WIDTH - 32,
  },
});

export default Style;
