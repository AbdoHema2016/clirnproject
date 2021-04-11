import React from 'react';
import {
  View,
  Text,
  InputAccessoryView,
  TouchableOpacity,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Layout} from '../../utilities';
import {translate} from '../../Localization';
import styles from './style';

const {HEX_COLOR_CODES} = Layout;

const KeyboardAccessoryView = ({inputAccessoryViewID, onPress, label}) => {
  if (Platform.OS !== 'ios') {
    return null;
  }

  const dismissKeyboard = () => Keyboard.dismiss();

  return (
    <InputAccessoryView
      nativeID={inputAccessoryViewID}
      backgroundColor={HEX_COLOR_CODES.UNDERLINE}>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={onPress || dismissKeyboard}
            activeOpacity={0.7}>
            <Text style={styles.label}>
              {label || translate('STRINGS.DONE')}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </InputAccessoryView>
  );
};

export default KeyboardAccessoryView;
