import React from 'react';
import {View, Text} from 'react-native';
import Style from './style';
import CLabel from '../cLabel';
import CTextField from '../cTextField';
import CButtonWithImage from '../cButtonWithImage';
import CPicker from '../cPicker';

function CLabelAndInputField(props) {
  const {
    type,
    title,
    titleStyle,
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
    buttonContainerStyle,
    buttonCustomStyle,
    imagePath,
    onPress,
    textStyle,
    text,
    setTitle,
    selectedValue,
    showDatePicker,
    pickerItems,
    modalVisible,
    androidPickerContainer,
    loading,
    customeImageStyle,
    testID,
    accessibilityLabel,
  } = props;
  const checkType = () => {
    if (type === 'TF') {
      return (
        <CTextField
          testID={testID}
          accessibilityLabel={accessibilityLabel}
          returnKeyType={returnKeyType}
          reference={reference}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          editable={editable}
          blurOnSubmit={blurOnSubmit}
          customSuperContainer={customSuperContainer}
          state={state}
          onSubmitEditing={onSubmitEditing}
          keyboardType={keyboardType}
          placeHolderText={placeHolderText}
          value={value}
          error={error}
          onChangeText={onChangeText}
          errorMessage={errorMessage}
        />
      );
    }
    if (type === 'Button') {
      return (
        <View>
          <CButtonWithImage
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            buttonContainerStyle={buttonContainerStyle}
            buttonCustomStyle={buttonCustomStyle}
            customeImageStyle={customeImageStyle}
            state={state}
            imagePath={imagePath}
            onPress={onPress}
            error={error}
            textStyle={textStyle}
            text={text}
            loading={loading}
            errorMessage={errorMessage}
          />
          {error && <Text style={Style.errorMessageLabel}>{errorMessage}</Text>}
        </View>
      );
    }
    return (
      <CPicker
        testID={testID}
        accessibilityLabel={accessibilityLabel}
        setTitle={setTitle}
        selectedValue={selectedValue}
        showDatePicker={showDatePicker}
        pickerItems={pickerItems}
        modalVisible={modalVisible}
        state={state}
        androidPickerContainer={androidPickerContainer}
        imagePath={imagePath}
      />
    );
  };
  return (
    <View style={Style.container}>
      <CLabel style={titleStyle} text={title} />
      {checkType()}
    </View>
  );
}
export default CLabelAndInputField;
