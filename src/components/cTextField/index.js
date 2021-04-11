import React, {PureComponent} from 'react';
import {View, TextInput, Text} from 'react-native';
import Style from './style';
import {Layout} from '../../utilities';
import CImage from '../cImage';
const {HEX_COLOR_CODES} = Layout;

class CTextField extends PureComponent {
  render() {
    const {
      hidePassword,
      containerStyle,
      textInputStyle = {},
      maxLength,
      keyboardType,
      onChangeText,
      value,
      placeHolderText,
      error,
      errorMessage,
      onSubmitEditing,
      state,
      customSuperContainer,
      reference,
      returnKeyType,
      blurOnSubmit = true,
      autoCapitalize,
      editable,
      onBlur,
      testID,
      accessibilityLabel,
      errorImage,
      errorImageStyle,
      errorMsgContainer,
    } = this.props;
    return (
      <View style={[Style.superContainer, customSuperContainer]}>
        <View
          style={[
            Style.container,
            containerStyle,
            error
              ? Style.errorStyle
              : state === 'Active'
              ? Style.active
              : state === 'Focused'
              ? Style.focused
              : null,
          ]}>
          <TextInput
            accessible={true}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            ref={reference}
            style={[Style.input, textInputStyle]}
            placeholder={placeHolderText}
            placeholderTextColor={
              error ? Style.errorText.color : HEX_COLOR_CODES.GRAY
            }
            secureTextEntry={hidePassword}
            value={value}
            returnKeyType={returnKeyType}
            numberOfLines={1}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            maxLength={maxLength}
            editable={editable}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            onBlur={onBlur}
            autoCapitalize={autoCapitalize}
          />
        </View>
        {error ? (
          <View style={errorMsgContainer}>
            {errorImage && (
              <CImage imagePath={errorImage} imageStyle={errorImageStyle} />
            )}
            <Text style={Style.errorMessageLabel}>{errorMessage}</Text>
          </View>
        ) : null}
      </View>
    );
  }
}

export default CTextField;
