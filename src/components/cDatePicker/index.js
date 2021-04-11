import React from 'react';
import {Modal, Text, TouchableHighlight, View, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Layout} from '../../utilities';
import {translate} from '../../Localization';

import {testIds} from '../../Constants';
const {HEX_COLOR_CODES} = Layout;
import Styles from './style';
const CDatePicker = (props) => {
  if (Platform.OS === 'android') {
    return returnDatePicker(props);
  }
  return (
    <View style={Styles.container}>
      <Modal
        style={Styles.centeredView}
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}>
        <TouchableHighlight
          style={Styles.openButton}
          onPress={props.showDatePicker}>
          <Text style={Styles.textStyle}>{translate('STRINGS.DONE')}</Text>
        </TouchableHighlight>
        {returnDatePicker(props)}
      </Modal>
    </View>
  );
};

const returnDatePicker = (props) => {
  return (
    <View style={Styles.datePicker}>
      <DateTimePicker
        testID={testIds.datePicker}
        accessibilityLabel={testIds.datePicker}
        display="spinner"
        maximumDate={props.maximumDate}
        mode={props.mode}
        value={props.chosenDate}
        onChange={props.setChosenDate}
        textColor={HEX_COLOR_CODES.BLACK}
      />
    </View>
  );
};
export default CDatePicker;
