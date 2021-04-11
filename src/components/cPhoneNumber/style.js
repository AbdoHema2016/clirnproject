import {StyleSheet} from 'react-native';
import {Platform} from 'react-native';
import {Layout} from '../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

const style = StyleSheet.create({
  superContainer: {
    height: 'auto',
    width: '100%',
  },
  container: {
    backgroundColor: HEX_COLOR_CODES.WHITE,
    flexDirection: 'row',
    marginTop: 4,
    height: 48,
    borderRadius: 4,
    width: '99%',
    paddingHorizontal: 15,
  },
  input: {
    color: HEX_COLOR_CODES.BLACK,
    paddingRight: 19,
    paddingLeft: 8,
    height: 48,
    textAlignVertical: 'center',
    fontSize: 18,
    bottom: Platform.select({
      ios: 0,
      android: 2,
    }),
    paddingTop: Platform.OS === 'ios' ? 3 : 18,
    flex: 7,
    fontFamily: FONTS.SOFIA_REGULAR,
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
  errorText: {
    color: HEX_COLOR_CODES.RED,
  },
  errorMessageLabel: {
    marginTop: 4,
    color: HEX_COLOR_CODES.RED,
    fontFamily: FONTS.SOFIA_REGULAR,
    fontSize: 12,
  },
  countryText: {
    textAlign: 'right',
    color: HEX_COLOR_CODES.BLACK,
    fontSize: 18,
    marginTop: Platform.OS === 'ios' ? 8 : 0,
    fontFamily: FONTS.SOFIA_REGULAR,
  },
  countryPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: HEX_COLOR_CODES.GRAY,
    paddingRight: 8,
    marginRight: 5,
  },
  dropDownIcon: {
    height: 12,
    width: 12,
    marginLeft: 5,
    marginRight: 3,
  },
});

export default style;
