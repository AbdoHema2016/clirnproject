import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import CImage from '../cImage';
import {Constants, Layout, testIds} from '../../utilities';
import Style from './style';

const {HEX_COLOR_CODES} = Layout;
const {LOCAL_PATH} = Constants;

function checkState(state) {
  switch (state) {
    case 'Active':
      return Style.active;
    case 'Focused':
      return Style.focused;
    default:
      return null;
  }
}
function CPassword(props) {
  const {
    reference,
    onSubmitEditing,
    placeHolderText,
    value,
    state,
    customSuperContainer,
    containerStyle,
    error,
    returnKeyType,
    onChangeText,
    errorMessage,
    hidePassword,
    hidePasswordAction,
    onBlur,
    testID,
    accessibilityLabel,
  } = props;
  return (
    <View style={[Style.superContainer, customSuperContainer]}>
      <View
        style={[
          Style.container,
          containerStyle,
          Style.flexRow,
          error ? Style.errorStyle : checkState(state),
        ]}>
        <TextInput
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          ref={reference}
          style={[Style.input, Style.textInput]}
          placeholder={placeHolderText}
          placeholderTextColor={
            error ? Style.errorText.color : HEX_COLOR_CODES.GRAY
          }
          secureTextEntry={hidePassword}
          value={value}
          returnKeyType={returnKeyType}
          onChangeText={onChangeText}
          editable={true}
          blurOnSubmit={false}
          onBlur={onBlur}
          onSubmitEditing={onSubmitEditing}
        />
        <TouchableOpacity
          testID={testIds.eye}
          accessibilityLabel={testIds.eye}
          onPress={hidePasswordAction}>
          <CImage
            imageStyle={Style.imageStyle}
            imagePath={LOCAL_PATH.SHOW_PASSWORD_ICON}
          />
        </TouchableOpacity>
      </View>

      {error && <Text style={Style.errorMessageLabel}>{errorMessage}</Text>}
    </View>
  );
}

export default CPassword;
