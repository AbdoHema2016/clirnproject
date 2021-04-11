import React, {PureComponent} from 'react';
import {View, TextInput, Text, StyleSheet, Image} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import Style from './style';
import {Layout, Constants} from '../../utilities';
import KeyboardAccessoryView from '../cInputAccessoryView';

const {HEX_COLOR_CODES} = Layout;
const {defaultCountryCode, LOCAL_PATH} = Constants;

class CTextField extends PureComponent {
  onSelectCountry = (countryData) => {
    this.props.onCountryCodeSelect({
      countryCode: countryData.cca2,
      callingCode: countryData?.callingCode ?? '',
    });
  };

  renderCountryPicker = () => {
    const {code, countryCodeList, editable = true} = this.props;
    const countryCodes = countryCodeList.map((country) => country.country_code);

    return (
      <>
        <View style={Style.countryPickerContainer}>
          <CountryPicker
            countryCodes={countryCodes}
            countryCode={code || defaultCountryCode}
            onSelect={this.onSelectCountry}
            withCloseButton
            withFilter
            withCallingCode
            withCallingCodeButton
          />
          <Image
            source={LOCAL_PATH.DROP_DOWN_ICON}
            style={Style.dropDownIcon}
          />
        </View>
        {!editable && <View style={{...StyleSheet.absoluteFill}} />}
      </>
    );
  };

  render() {
    const {
      hidePassword,
      containerStyle,
      maxLength,
      keyboardType,
      onChangeText,
      value,
      placeHolderText,
      error,
      errorMessage,
      returnKeyType,
      state,
      editable,
      reference,
      backgroundColor,
      onBlur,
      accessoryViewLabel,
      onSubmitEditing,
      blurOnSubmit,
      testID,
      accessibilityLabel,
    } = this.props;
    const phoneInputAccessoryViewID = 'phoneInputAccessoryViewID';

    return (
      <View style={Style.superContainer}>
        <View
          style={[
            Style.container,
            containerStyle,
            backgroundColor,
            error
              ? Style.errorStyle
              : state === 'Active'
              ? Style.active
              : state === 'Focused'
              ? Style.focused
              : null,
          ]}>
          {this.renderCountryPicker()}
          <TextInput
            accessible={true}
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            editable={editable}
            scrollEnabled={false}
            ref={reference}
            onBlur={onBlur}
            style={[Style.input]}
            underlineColorAndroid={'transparent'}
            placeholder={placeHolderText}
            placeholderTextColor={
              error ? Style.errorText.color : HEX_COLOR_CODES.GRAY
            }
            secureTextEntry={hidePassword}
            value={value}
            numberOfLines={1}
            returnKeyType={returnKeyType}
            keyboardType={keyboardType}
            onChangeText={onChangeText}
            maxLength={maxLength}
            inputAccessoryViewID={phoneInputAccessoryViewID}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
          />

          <KeyboardAccessoryView
            inputAccessoryViewID={phoneInputAccessoryViewID}
            label={accessoryViewLabel}
            onPress={onSubmitEditing}
          />
        </View>
        {error ? (
          <Text style={Style.errorMessageLabel}>{errorMessage}</Text>
        ) : null}
      </View>
    );
  }
}

export default CTextField;
