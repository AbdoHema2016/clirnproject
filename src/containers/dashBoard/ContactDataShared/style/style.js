import {StyleSheet} from 'react-native';
import {Layout} from '../../../../utilities';

const {HEX_COLOR_CODES, FONTS} = Layout;

const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: HEX_COLOR_CODES.GREY_BG},
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  yourIdBeingVerified: {
    fontFamily: FONTS.SOFIA_MEDIUM,
    fontSize: 24,
    marginHorizontal: 15,
    textAlign: 'center',
    color: HEX_COLOR_CODES.GREEN,
  },
  tick: {alignSelf: 'center', marginTop: 20},
  ok: {color: HEX_COLOR_CODES.WHITE},
  okButton: {
    backgroundColor: HEX_COLOR_CODES.GREEN,
    marginHorizontal: 15,
    marginBottom: 60,
  },
});
export default Styles;
