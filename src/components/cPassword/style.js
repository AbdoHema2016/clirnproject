import {StyleSheet} from 'react-native';
import CTestStyle from '../../components/cTextField/style';

const Style = StyleSheet.create({
  ...CTestStyle,
  textInput: {
    width: '90%',
    marginLeft: 0,
  },
  flexRow: {
    flexDirection: 'row',
  },
  imageStyle: {
    marginRight: 18,
    width: 25,
    height: 25,
  },
});

export default Style;
