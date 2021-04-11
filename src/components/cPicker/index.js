import React from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Styles from './style';
import Style from '../../containers/onBoarding/contactDetails/style';
import {testIds} from '../../Constants';
const CPicker = (props) => {
  const pickerItems = Array.isArray(props.pickerItems) ? props.pickerItems : [];
  const serviceItems = pickerItems.map((s, i) => {
    return (
      <Picker.Item
        accessible={true}
        testID={s}
        accessibilityLabel={s}
        key={i}
        value={s}
        label={s}
      />
    );
  });
  if (Platform.OS === 'ios') {
    return (
      <View style={Styles.container}>
        <Modal
          style={Styles.centeredView}
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}>
          <TouchableOpacity
            accessible={true}
            testID={props.testID}
            accessibilityLabel={props.accessibilityLabel}
            style={Styles.doneButton}
            onPress={() => {
              props.showDatePicker(
                props.selectedValue === ''
                  ? pickerItems[0]
                  : props.selectedValue,
              );
            }}>
            <Text style={Styles.textStyle}>Done</Text>
          </TouchableOpacity>

          <Picker
            testID={testIds.picker}
            accessibilityLabel={testIds.picker}
            selectedValue={props.selectedValue}
            style={Styles.iosPicker}
            onValueChange={(itemValue, itemIndex) => props.setTitle(itemValue)}>
            {serviceItems}
          </Picker>
        </Modal>
      </View>
    );
  } else {
    return (
      <View
        style={[
          Styles.androidPickerContainer,
          props.androidPickerContainer,
          props.error
            ? Styles.errorStyle
            : props.state === 'Active'
            ? Styles.active
            : props.state === 'Focused'
            ? Styles.focused
            : null,
        ]}>
        <Picker
          accessible={true}
          testID={props.testID}
          accessibilityLabel={props.accessibilityLabel}
          selectedValue={props.selectedValue}
          mode={'dialog'}
          style={[Styles.androidPicker, props.androidPicker]}
          onValueChange={(itemValue, itemIndex) => props.setTitle(itemValue)}>
          {serviceItems}
        </Picker>
        <Image source={props.imagePath} style={Style.buttonImageStyle} />
      </View>
    );
  }
};

export default CPicker;
